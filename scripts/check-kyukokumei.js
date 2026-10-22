"use strict";
// =============================================================
// 旧国名の点検（依存なし・Node標準のみ）
//
// 正本 data/hns_admin_division_master.yaml の kyukokumei（86 か国の表）を読み、
//   1. 採用の名（fictional。verdict があるときは「採用」で始まるものだけ）に
//      旧国名の実名がそのまま入っていないか
//      （表の real_use に載せた名＝替え待ち・例外 は数えない）
//   2. 表の hns（日ノ本名）が、採用の名として正本にあるか
// を確かめる。どちらかに当たれば名前を並べて ExitCode 1。
// DIFF-051：Gin「随時だと今回みたいに総点検が必要になるのではという不安」→「１」(2026-10-22)
// =============================================================
const fs = require("fs");
const path = require("path");

const EXIT_OK = 0;
const EXIT_NG = 1;

function adoptedFictional(masterText) {
  const names = new Set();
  for (const line of masterText.split("\n")) {
    const f = line.match(/fictional: "([^"]+)"/);
    if (!f) continue;
    const v = line.match(/verdict: "([^"]+)"/);
    if (v && !v[1].startsWith("採用")) continue;
    names.add(f[1]);
  }
  return names;
}

function kuniTable(masterText) {
  const m = masterText.match(/(^|\n)kyukokumei:/);
  if (!m) return [];
  const start = m.index;
  const rows = [];
  for (const line of masterText.slice(start).split("\n")) {
    const k = line.match(/^    - \{kuni: "([^"]+)"/);
    if (!k) continue;
    const h = line.match(/hns: "([^"]+)"/);
    const u = line.match(/real_use: \{names: \[([^\]]*)\]/);
    rows.push({
      kuni: k[1],
      hns: h ? h[1] : null,
      realUse: u ? [...u[1].matchAll(/"([^"]+)"/g)].map(x => x[1]) : []
    });
  }
  return rows;
}

function check({ masterPath }) {
  const master = fs.readFileSync(masterPath, "utf8");
  const names = adoptedFictional(master);
  const table = kuniTable(master);
  const realInName = [];
  const hnsMissing = [];
  const allowed = [];
  for (const row of table) {
    for (const n of names) {
      if (!n.includes(row.kuni)) continue;
      if (row.realUse.includes(n)) allowed.push(`${row.kuni}: ${n}`);
      else realInName.push(`${row.kuni}: ${n}`);
    }
    // 状態の言葉（要修正・条件付き・未提出）がついた日ノ本名は、まだ採用でないので数えない
    if (row.hns && !/要修正|条件付き|未提出/.test(row.hns)) {
      const name = row.hns.replace(/（.*$/, "");
      if (!names.has(name)) hnsMissing.push(`${row.kuni}: ${name}`);
    }
  }
  const uniq = a => [...new Set(a)];
  const r = { realInName: uniq(realInName), hnsMissing: uniq(hnsMissing), allowed: uniq(allowed), count: table.length };
  r.code = r.count === 0 || r.realInName.length || r.hnsMissing.length ? EXIT_NG : EXIT_OK;
  return r;
}

module.exports = { adoptedFictional, kuniTable, check, EXIT_OK, EXIT_NG };

if (require.main === module) {
  const r = check({ masterPath: path.join(__dirname, "..", "data", "hns_admin_division_master.yaml") });
  if (r.count === 0) console.log("  NG: 正本に kyukokumei の表がない");
  for (const x of r.realInName) console.log(`  NG: 採用の名に旧国名の実名 ${x}`);
  for (const x of r.hnsMissing) console.log(`  NG: 表の日ノ本名が正本の採用の名にない ${x}`);
  if (r.code === EXIT_OK) console.log(`  OK: 旧国名 ${r.count} か国、採用の名に実名なし`);
  for (const x of r.allowed) console.log(`  （替え待ち・例外）${x}`);
  process.exit(r.code);
}
