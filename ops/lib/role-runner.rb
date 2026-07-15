#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"
require "open3"
require "shellwords"
require "time"
require "yaml"

class RoleRunner
  TERMINAL = %w[completed escalated max_rounds failed].freeze

  def initialize(root:, task_path:, runtime_map_path: nil)
    @root = root
    @task_path = File.expand_path(task_path, root)
    @runtime_map_path = runtime_map_path || File.join(root, "ops/runtime-map.yaml")
    @policy_path = File.join(root, "ops/policy.yaml")
    @run_id = "#{File.basename(task_path, File.extname(task_path))}-#{Time.now.utc.strftime('%Y%m%dT%H%M%SZ')}-#{Process.pid}"
    @work_dir = File.join(root, "ops/work", @run_id)
    @review_dir = File.join(root, "ops/reviews", @run_id)
    @result_path = File.join(root, "ops/results", "#{@run_id}.yaml")
    @state_path = File.join(root, "ops/state", "#{@run_id}.yaml")
    @log_path = File.join(@work_dir, "runner.log")
  end

  def run
    prepare
    @task = load_yaml(@task_path)
    @runtime_map = load_yaml(@runtime_map_path)
    @policy = load_yaml(@policy_path)
    validate!
    copy_input
    save_state("running", 0)

    failures = 0
    max_rounds = Integer(@policy.fetch("max_rounds", 3))
    1.upto(max_rounds) do |round|
      log("round #{round}: implementation")
      implementation = invoke_role("HNS-Imp-local", implementation_prompt(round), round, "implementation")
      implementation_escalation = implementation_escalation_reason(implementation)
      if implementation_escalation
        return finish("escalated", round, implementation_escalation, implementation, nil, nil)
      end
      test_result = run_tests(round)
      failures = test_result["passed"] ? 0 : failures + 1
      save_state("running", round, "test" => test_result, "implementation" => implementation)

      if failures >= Integer(@policy.fetch("repeated_failure_threshold", 2))
        return finish("escalated", round, "repeated_failure", implementation, nil, test_result)
      end

      log("round #{round}: review")
      review = invoke_role("HNS-Rev-local", review_prompt(round, implementation, test_result), round, "review")
      escalation = escalation_reason(review)
      return finish("escalated", round, escalation, implementation, review, test_result) if escalation

      severity = review.fetch("review_severity")
      if severity == "note" && test_result["passed"]
        return finish("completed", round, nil, implementation, review, test_result)
      end

      save_state("running", round, "next_action" => "revise", "review" => review)
    end

    finish("max_rounds", max_rounds, "round_limit", nil, nil, nil)
  rescue StandardError => e
    log("fatal: #{e.class}: #{e.message}") rescue nil
    finish("failed", current_round, "runtime_error", nil, nil, nil,
           "error" => { "class" => e.class.name, "message" => e.message }) rescue warn(e.full_message)
    1
  end

  private

  def prepare
    %w[tasks work reviews results state decisions].each do |name|
      FileUtils.mkdir_p(File.join(@root, "ops", name))
    end
    FileUtils.mkdir_p(@work_dir)
    FileUtils.mkdir_p(@review_dir)
  end

  def load_yaml(path)
    value = YAML.safe_load(File.read(path), permitted_classes: [Time], aliases: false)
    raise "YAML root must be a mapping: #{path}" unless value.is_a?(Hash)
    value
  rescue Psych::Exception => e
    raise "invalid YAML #{path}: #{e.message}"
  end

  def validate!
    raise "task not found: #{@task_path}" unless File.file?(@task_path)
    roles = @runtime_map.fetch("roles")
    %w[HNS-Imp-local HNS-Rev-local].each do |role|
      command = roles.dig(role, "command")
      raise "missing command mapping for #{role}" unless command.is_a?(Array) && command.all? { |v| v.is_a?(String) }
    end
  end

  def copy_input
    FileUtils.cp(@task_path, File.join(@work_dir, "task.yaml"))
  end

  def implementation_prompt(round)
    previous = round == 1 ? nil : read_if_exists(File.join(@review_dir, format("round-%02d.yaml", round - 1)))
    <<~PROMPT
      You are HNS-Imp-local. Implement the supplied YAML Task in the current repository.
      Do not push, merge, approve canonical changes, or issue decisions.
      Round: #{round}
      Task:
      #{@task.to_yaml}
      #{previous ? "Previous review:\n#{previous}" : ""}
      After working, return exactly one YAML mapping with these keys:
      status: changed|unchanged|blocked
      summary: string
      changed_files: [string]
      canon_change_requested: boolean
      decision_required: boolean
      acceptance_test_change_requested: boolean
    PROMPT
  end

  def review_prompt(round, implementation, test_result)
    <<~PROMPT
      You are HNS-Rev-local. Review the implementation against the supplied YAML Task.
      Do not edit files. Classify severity conservatively.
      Round: #{round}
      Task:
      #{@task.to_yaml}
      Implementation receipt:
      #{implementation.to_yaml}
      Test result:
      #{test_result.to_yaml}
      Return exactly one YAML mapping with these keys:
      review_severity: note|minor|moderate|major|blocker
      summary: string
      findings: [{id: string, severity: string, message: string, file: string|null}]
      scope_unchanged: boolean
      canon_change_requested: boolean
      decision_required: boolean
      acceptance_test_change_requested: boolean
      conflicting_recommendations: boolean
    PROMPT
  end

  def invoke_role(role, prompt, round, kind)
    mapping = @runtime_map.fetch("roles").fetch(role)
    command = mapping.fetch("command")
    raise "unsupported prompt transport for #{role}" unless mapping.fetch("prompt_via", "stdin") == "stdin"
    stdout, stderr, status = Open3.capture3(*command, stdin_data: prompt, chdir: @root)
    base = kind == "review" ? @review_dir : @work_dir
    prefix = File.join(base, format("round-%02d", round))
    request = { "role" => role, "round" => round, "kind" => kind, "prompt" => prompt }
    File.write("#{prefix}.request.yaml", request.to_yaml)
    File.write("#{prefix}.stdout.log", stdout)
    File.write("#{prefix}.stderr.log", stderr)
    raise "#{role} exited #{status.exitstatus}" unless status.success?
    parsed = parse_runtime_yaml(stdout)
    validate_runtime_output!(kind, parsed)
    File.write("#{prefix}.yaml", parsed.to_yaml)
    parsed
  end

  def parse_runtime_yaml(text)
    fenced = text.scan(/```(?:yaml|yml)\s*\n(.*?)```/mi).flatten.last
    cleaned = (fenced || text).strip.sub(/\A```(?:yaml|yml)?\s*/i, "").sub(/\s*```\z/, "")
    value = YAML.safe_load(cleaned, aliases: false)
    raise "runtime output must be a YAML mapping" unless value.is_a?(Hash)
    value
  rescue Psych::Exception => e
    raise "runtime returned invalid YAML: #{e.message}"
  end

  def validate_runtime_output!(kind, value)
    required = if kind == "review"
                 %w[review_severity scope_unchanged canon_change_requested decision_required acceptance_test_change_requested conflicting_recommendations]
               else
                 %w[status canon_change_requested decision_required acceptance_test_change_requested]
               end
    missing = required.reject { |key| value.key?(key) }
    raise "runtime output missing keys: #{missing.join(', ')}" unless missing.empty?
    return unless kind == "review"
    allowed = %w[note minor moderate major blocker]
    raise "invalid review_severity" unless allowed.include?(value["review_severity"])
  end

  def run_tests(round)
    command = @task.dig("execution", "test_command") || @policy.fetch("default_test_command")
    command = Shellwords.split(command) if command.is_a?(String)
    raise "test command must be a string or string array" unless command.is_a?(Array) && command.all? { |v| v.is_a?(String) }
    stdout, stderr, status = Open3.capture3(*command, chdir: @root)
    File.write(File.join(@work_dir, format("round-%02d.test.stdout.log", round)), stdout)
    File.write(File.join(@work_dir, format("round-%02d.test.stderr.log", round)), stderr)
    result = { "command" => command, "passed" => status.success?, "exit_code" => status.exitstatus }
    File.write(File.join(@work_dir, format("round-%02d.test.yaml", round)), result.to_yaml)
    result
  rescue Errno::ENOENT => e
    result = { "command" => command, "passed" => false, "exit_code" => nil, "error" => e.message }
    File.write(File.join(@work_dir, format("round-%02d.test.yaml", round)), result.to_yaml)
    result
  end

  def escalation_reason(review)
    return "review_severity" if @policy.fetch("escalate_severities").include?(review["review_severity"])
    return "scope_changed" unless review["scope_unchanged"]
    %w[canon_change_requested decision_required acceptance_test_change_requested conflicting_recommendations].find { |key| review[key] }
  end

  def implementation_escalation_reason(implementation)
    %w[canon_change_requested decision_required acceptance_test_change_requested].find { |key| implementation[key] }
  end

  def save_state(status, round, extra = {})
    data = { "run_id" => @run_id, "status" => status, "round" => round,
             "task_path" => relative(@task_path), "updated_at" => Time.now.utc.iso8601 }.merge(extra)
    atomic_yaml(@state_path, data)
  end

  def finish(status, round, reason, implementation, review, test_result, extra = {})
    gin_request_path = status == "escalated" ? write_gin_request(round, reason, implementation, review, test_result) : nil
    receipt = { "run_id" => @run_id, "status" => status, "reason" => reason, "rounds" => round,
                "task_path" => relative(@task_path), "state_path" => relative(@state_path),
                "work_path" => relative(@work_dir), "review_path" => relative(@review_dir),
                "gin_request_path" => gin_request_path && relative(gin_request_path),
                "implementation" => implementation, "review" => review, "test" => test_result,
                "finished_at" => Time.now.utc.iso8601 }.merge(extra)
    atomic_yaml(@result_path, receipt)
    save_state(status, round, "reason" => reason, "result_path" => relative(@result_path))
    puts receipt.to_yaml
    status == "completed" ? 0 : 2
  end

  def write_gin_request(round, reason, implementation, review, test_result)
    path = File.join(@root, "ops/decisions", "#{@run_id}-gin-request.yaml")
    request = {
      "document_type" => "DecisionRequest",
      "run_id" => @run_id,
      "status" => "awaiting_gin",
      "escalation_reason" => reason,
      "round" => round,
      "task_path" => relative(@task_path),
      "requested_from" => "Gin",
      "requested_action" => "Decision or approval",
      "decision_issued" => false,
      "implementation" => implementation,
      "review" => review,
      "test" => test_result,
      "created_at" => Time.now.utc.iso8601
    }
    atomic_yaml(path, request)
    path
  end

  def atomic_yaml(path, value)
    tmp = "#{path}.tmp-#{Process.pid}"
    File.write(tmp, value.to_yaml)
    File.rename(tmp, path)
  ensure
    FileUtils.rm_f(tmp) if tmp
  end

  def log(message)
    File.open(@log_path, "a") { |file| file.puts("#{Time.now.utc.iso8601} #{message}") }
  end

  def read_if_exists(path)
    File.file?(path) ? File.read(path) : nil
  end

  def relative(path)
    path.delete_prefix("#{@root}/")
  end

  def current_round
    File.file?(@state_path) ? load_yaml(@state_path).fetch("round", 0) : 0
  end
end

if ARGV.empty? || %w[-h --help].include?(ARGV[0])
  warn "Usage: ops/run-cycle.sh TASK.yaml [RUNTIME_MAP.yaml]"
  exit(ARGV.empty? ? 64 : 0)
end

root = ENV.fetch("HNS_ROLE_RUNNER_ROOT", File.expand_path("../..", __dir__))
exit RoleRunner.new(root: root, task_path: ARGV[0], runtime_map_path: ARGV[1]).run
