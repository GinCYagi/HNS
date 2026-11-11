// =============================================================
// check-tsunagari.js のテスト（依存なし・Node標準のみ）
//   1. 抜けなし → ExitCode 0
//   2. 抜けあり → ExitCode 1 / 抜けた名前を返す
//   3. 採用でない名前（候補・却下）は数えない
//   4. 本物の正本とつながりの地図に抜けがない
// =============================================================
const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { check, EXIT_OK, EXIT_MISSING } = require("./check-tsunagari.js");

const MASTER = [
  "admin_divisions:",
  "  - id: A000",
  '    fictional: "五国府"',
  '    status: "採用:五国府"',
  "  - id: A099",
  '    fictional: "未決の道"',
  '    status: "未提出"',
  "# -------------------------------------------------------------",
  "additions_2026_10:",
  "  cities:",
  '    - {real: "燕市", fictional: "雀市", verdict: "採用"}',
  '    - {real: "某", fictional: "却下の町", verdict: "棄却"}',
  ""
].join("\n");

function fixture(mapText) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hns-ts-"));
  const masterPath = path.join(dir, "master.yaml");
  const mapPath = path.join(dir, "tsunagari.md");
  fs.writeFileSync(masterPath, MASTER);
  fs.writeFileSync(mapPath, mapText);
  return { masterPath, mapPath };
}

let passed = 0;
function ok(name, cond) {
  assert.ok(cond, name);
  console.log(`  ok - ${name}`);
  passed++;
}

{
  const r = check(fixture("| 五国府 |\n| 雀市 |\n"));
  ok("抜けなし: ExitCode 0", r.code === EXIT_OK && r.missing.length === 0);
}
{
  const r = check(fixture("| 五国府 |\n"));
  ok("抜けあり: ExitCode 1", r.code === EXIT_MISSING);
  ok("抜けあり: 雀市を挙げる", r.missing.length === 1 && r.missing[0] === "雀市");
}
{
  const r = check(fixture("| 五国府 |\n| 雀市 |\n"));
  ok("採用でない名前は数えない", !r.missing.includes("未決の道") && !r.missing.includes("却下の町"));
}
{
  const base = path.join(__dirname, "..");
  const r = check({
    masterPath: path.join(base, "data", "hns_admin_division_master.yaml"),
    mapPath: path.join(base, "docs", "tsunagari.md")
  });
  ok(`本物の正本とつながりの地図に抜けなし${r.missing.length ? "（抜け: " + r.missing.join("、") + "）" : ""}`, r.code === EXIT_OK);
}

console.log(`\n${passed} checks passed.`);
