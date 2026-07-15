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

def setup_root(dir, behavior, auto_severities: %w[note minor])
  %w[tasks work reviews results state decisions test].each do |name|
    FileUtils.mkdir_p(File.join(dir, "ops", name))
  end
  write(File.join(dir, "data/canonical.yaml"), "value: original\n")
  write(File.join(dir, "ops/test/acceptance.test.rb"), "# original acceptance test\n")
  write(File.join(dir, "package.json"), "{}\n")
  write(File.join(dir, "ops/policy.yaml"), {
    "max_rounds" => 3,
    "default_test_command" => ["ruby", "-e", "exit 0"],
    "auto_continue_severities" => auto_severities,
    "escalate_severities" => %w[moderate major blocker],
    "repeated_failure_threshold" => 2,
    "protected_paths" => {
      "canonical" => ["data/canonical.yaml"],
      "acceptance" => ["package.json", "ops/test/**/*"]
    }
  }.to_yaml)
  write(File.join(dir, "ops/tasks/task.yaml"), {
    "header" => { "canonical" => "test" },
    "objective" => "test",
    "scope" => { "included" => ["test"] },
    "acceptance" => ["runner test passes"]
  }.to_yaml)

  fake = File.join(dir, "fake-runtime.rb")
  write(fake, <<~RUBY)
    require "yaml"
    mode, behavior, counter = ARGV
    STDIN.read
    exit 9 if mode == "implementation" && behavior == "runtime_error"
    if mode == "implementation"
      File.write("data/canonical.yaml", "value: changed\\n") if behavior == "canonical_mutation_lie"
      File.write("ops/test/acceptance.test.rb", "# changed acceptance test\\n") if behavior == "acceptance_mutation_lie"
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
      "HNS-Imp-local" => { "command" => ["ruby", fake, "implementation", behavior, counter], "prompt_via" => "stdin" },
      "HNS-Rev-local" => { "command" => ["ruby", fake, "review", behavior, counter], "prompt_via" => "stdin" }
    }
  }
  write(File.join(dir, "runtime-map.yaml"), map.to_yaml)
end

def execute(behavior, auto_severities: %w[note minor])
  Dir.mktmpdir("hns-role-runner-") do |dir|
    setup_root(dir, behavior, auto_severities: auto_severities)
    stdout, stderr, status = Open3.capture3(
      { "HNS_ROLE_RUNNER_ROOT" => dir }, "ruby", RUNNER,
      "ops/tasks/task.yaml", File.join(dir, "runtime-map.yaml")
    )
    receipt = YAML.safe_load(stdout, aliases: false)
    yield receipt, status, dir, stderr
  end
end

execute("minor_then_note") do |receipt, status, dir, _stderr|
  assert("minor is returned automatically and note completes", status.success? && receipt["rounds"] == 2)
  implementation_outputs = Dir[File.join(dir, "ops/work/*/round-??.yaml")]
  review_outputs = Dir[File.join(dir, "ops/reviews/*/round-??.yaml")]
  requests = Dir[File.join(dir, "ops/{work,reviews}/*/*.request.yaml")]
  assert("each runtime input and output is YAML", implementation_outputs.length == 2 && review_outputs.length == 2 && requests.length == 4)
  assert("receipt, state, and protection check are saved",
         Dir[File.join(dir, "ops/results/*.yaml")].length == 1 &&
         Dir[File.join(dir, "ops/state/*.yaml")].length == 1 &&
         receipt.dig("protected_path_check", "passed") == true)
end

execute("moderate") do |receipt, status, _dir, _stderr|
  assert("moderate stops for Gin", status.exitstatus == 2 && receipt["status"] == "escalated" && receipt["rounds"] == 1)
end

execute("decision") do |receipt, status, dir, _stderr|
  request_path = receipt["gin_request_path"] && File.join(dir, receipt["gin_request_path"])
  request = request_path && YAML.safe_load(File.read(request_path), aliases: false)
  assert("decision request stops before review", status.exitstatus == 2 && receipt["reason"] == "canon_change_requested" && receipt["review"].nil?)
  assert("Gin request YAML is generated without issuing a Decision", request && request["status"] == "awaiting_gin" && request["decision_issued"] == false)
end

execute("minor") do |receipt, status, _dir, _stderr|
  assert("runner always stops at three rounds", status.exitstatus == 2 && receipt["status"] == "max_rounds" && receipt["rounds"] == 3)
end

execute("canonical_mutation_lie") do |receipt, status, _dir, _stderr|
  changes = receipt.dig("protected_path_check", "changes") || []
  assert("canonical mutation is detected despite false self-report",
         status.exitstatus == 2 && receipt["reason"] == "protected_canonical_change" &&
         changes.any? { |change| change["path"] == "data/canonical.yaml" })
end

execute("acceptance_mutation_lie") do |receipt, status, _dir, _stderr|
  changes = receipt.dig("protected_path_check", "changes") || []
  assert("acceptance test mutation is detected despite false self-report",
         status.exitstatus == 2 && receipt["reason"] == "protected_acceptance_change" &&
         changes.any? { |change| change["path"] == "ops/test/acceptance.test.rb" })
end

execute("runtime_error") do |receipt, status, _dir, _stderr|
  assert("runtime exception uses documented exit code 2",
         status.exitstatus == 2 && receipt["status"] == "failed" && receipt["reason"] == "runtime_error")
end

execute("minor", auto_severities: ["note"]) do |receipt, status, _dir, _stderr|
  assert("auto_continue_severities controls non-escalating severities",
         status.exitstatus == 2 && receipt["status"] == "escalated" && receipt["reason"] == "unhandled_review_severity")
end

puts "\nRole Runner checks passed."
