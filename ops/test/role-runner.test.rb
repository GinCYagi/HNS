#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"
require "open3"
require "tmpdir"
require "yaml"

RUNNER = File.expand_path("../lib/role-runner.rb", __dir__)

def assert(label, condition)
  raise "FAIL: #{label}" unless condition
  puts "  ok - #{label}"
end

def write(path, content)
  FileUtils.mkdir_p(File.dirname(path))
  File.write(path, content)
end

def setup_root(dir, review_mode)
  %w[tasks work reviews results state decisions].each { |name| FileUtils.mkdir_p(File.join(dir, "ops", name)) }
  write(File.join(dir, "ops/policy.yaml"), <<~YAML)
    max_rounds: 3
    default_test_command: ["ruby", "-e", "exit 0"]
    escalate_severities: ["moderate", "major", "blocker"]
    repeated_failure_threshold: 2
  YAML
  write(File.join(dir, "ops/tasks/task.yaml"), "objective: test\n")
  fake = File.join(dir, "fake-runtime.rb")
  write(fake, <<~RUBY)
    require "yaml"
    mode, behavior, counter = ARGV
    STDIN.read
    if mode == "implementation"
      decision = behavior == "decision"
      puts({"status"=>decision ? "blocked" : "changed", "summary"=>"done", "changed_files"=>[],
            "canon_change_requested"=>decision, "decision_required"=>decision,
            "acceptance_test_change_requested"=>false}.to_yaml)
    else
      count = File.file?(counter) ? File.read(counter).to_i : 0
      File.write(counter, (count + 1).to_s)
      severity = behavior == "minor_then_note" && count > 0 ? "note" : behavior.sub("_then_note", "")
      payload = {"review_severity"=>severity, "summary"=>"reviewed", "findings"=>[], "scope_unchanged"=>true,
                 "canon_change_requested"=>false, "decision_required"=>false,
                 "acceptance_test_change_requested"=>false, "conflicting_recommendations"=>false}.to_yaml
      puts "Review summary before structured output."
      puts "```yaml"
      puts payload
      puts "```"
    end
  RUBY
  counter = File.join(dir, "counter")
  map = {
    "roles" => {
      "HNS-Imp-local" => { "command" => ["ruby", fake, "implementation", review_mode, counter], "prompt_via" => "stdin" },
      "HNS-Rev-local" => { "command" => ["ruby", fake, "review", review_mode, counter], "prompt_via" => "stdin" }
    }
  }
  write(File.join(dir, "runtime-map.yaml"), map.to_yaml)
end

def execute(review_mode)
  Dir.mktmpdir("hns-role-runner-") do |dir|
    setup_root(dir, review_mode)
    stdout, stderr, status = Open3.capture3(
      { "HNS_ROLE_RUNNER_ROOT" => dir }, "ruby", RUNNER,
      "ops/tasks/task.yaml", File.join(dir, "runtime-map.yaml")
    )
    receipt = YAML.safe_load(stdout, aliases: false)
    results = Dir[File.join(dir, "ops/results/*.yaml")]
    states = Dir[File.join(dir, "ops/state/*.yaml")]
    yield receipt, status, results, states, dir, stderr
  end
end

execute("minor_then_note") do |receipt, status, results, states, dir, _stderr|
  assert("minor is returned automatically and note completes", status.success? && receipt["rounds"] == 2)
  implementation_outputs = Dir[File.join(dir, "ops/work/*/round-??.yaml")]
  review_outputs = Dir[File.join(dir, "ops/reviews/*/round-??.yaml")]
  requests = Dir[File.join(dir, "ops/{work,reviews}/*/*.request.yaml")]
  assert("each runtime input and output is YAML", implementation_outputs.length == 2 && review_outputs.length == 2 && requests.length == 4)
  assert("receipt and state are saved", results.length == 1 && states.length == 1)
end

execute("moderate") do |receipt, status, _results, _states, _dir, _stderr|
  assert("moderate stops for Gin", !status.success? && receipt["status"] == "escalated" && receipt["rounds"] == 1)
end


execute("decision") do |receipt, status, _results, _states, dir, _stderr|
  request_path = receipt["gin_request_path"] && File.join(dir, receipt["gin_request_path"])
  request = request_path && YAML.safe_load(File.read(request_path), aliases: false)
  assert("decision request stops before review", !status.success? && receipt["status"] == "escalated" && receipt["reason"] == "canon_change_requested" && receipt["review"].nil?)
  assert("Gin request YAML is generated without issuing a Decision", request && request["status"] == "awaiting_gin" && request["decision_issued"] == false)
end

execute("minor") do |receipt, status, _results, _states, _dir, _stderr|
  assert("runner always stops at three rounds", !status.success? && receipt["status"] == "max_rounds" && receipt["rounds"] == 3)
end

puts "\nRole Runner checks passed."
