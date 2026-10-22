// =============================================================
// check-kyukokumei.js のテスト（依存なし・Node標準のみ）
//   1. 実名なし → ExitCode 0
//   2. 採用の名に実名 → ExitCode 1 / その名を返す
//   3. real_use に載せた名・採用でない名は数えない
//   4. 表の日ノ本名が採用の名にない → ExitCode 1
//   5. 本物の正本が通る
// =============================================================
const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { check, EXIT_OK, EXIT_NG } = require("./check-kyukokumei.js");

function fixture(lines) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "hns-kk-"));
  const masterPath = path.join(dir, "master.yaml");
  fs.writeFileSync(masterPath, lines.join("\n") + "\n");
  return { masterPath };
}
const TABLE = [
  "kyukokumei:",
  "  entries:",
  '    - {kuni: "尾張", yomi: "おわり", hns: "殿伸（とのび）"}',
  '    - {kuni: "因幡", yomi: "いなば", hns: null, real_use: {names: ["因幡野町"], status: "例外"}}'
];

let passed = 0;
function ok(name, cond) {
  assert.ok(cond, name);
  console.log(`  ok - ${name}`);
  passed++;
}

{
  const r = check(fixture(['  - {real: "尾張(旧国名)", fictional: "殿伸", verdict: "採用"}', ...TABLE]));
  ok("実名なし: ExitCode 0", r.code === EXIT_OK);
}
{
  const r = check(fixture(['  - {real: "尾張(旧国名)", fictional: "殿伸", verdict: "採用"}', '  - {real: "x", fictional: "尾張新町", verdict: "採用"}', ...TABLE]));
  ok("採用の名に実名: ExitCode 1", r.code === EXIT_NG && r.realInName.includes("尾張: 尾張新町"));
}
{
  const r = check(fixture(['  - {real: "尾張(旧国名)", fictional: "殿伸", verdict: "採用"}', '  - {real: "蒲原町", fictional: "因幡野町", verdict: "採用"}', '  - {real: "y", fictional: "尾張案", verdict: "棄却"}', ...TABLE]));
  ok("real_use と採用でない名は数えない", r.code === EXIT_OK && r.allowed.includes("因幡: 因幡野町"));
}
{
  const r = check(fixture(TABLE));
  ok("表の日ノ本名が採用の名にない: ExitCode 1", r.code === EXIT_NG && r.hnsMissing.includes("尾張: 殿伸"));
}
{
  const r = check({ masterPath: path.join(__dirname, "..", "data", "hns_admin_division_master.yaml") });
  ok(`本物の正本が通る${r.code ? "（" + [...r.realInName, ...r.hnsMissing].join("、") + "）" : ""}`, r.code === EXIT_OK);
}

console.log(`\n${passed} checks passed.`);
