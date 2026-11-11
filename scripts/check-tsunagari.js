"use strict";
// =============================================================
// つながりの地図（docs/tsunagari.md）の抜けを点検する（依存なし・Node標準のみ）
//
// 正本 data/hns_admin_division_master.yaml の
//   - admin_divisions の各エントリ（status が「採用」で始まるもの）の fictional
//   - additions_2026_10 の各行（verdict が「採用」で始まるもの）の fictional
// が、
// docs/tsunagari.md のどこかに載っているかを確かめる。
// 抜けがあれば名前を並べて ExitCode 1。
// Gin「繋がりの地図はコミットの地点で抜けがないか確認するようにしましょう」(2026-10-03)
// =============================================================
const fs = require("fs");
const path = require("path");

const EXIT_OK = 0;
const EXIT_MISSING = 1;

function adoptedNames(masterText) {
  const names = [];
  const divStart = masterText.indexOf("admin_divisions:");
  const start = masterText.indexOf("additions_2026_10:");
  if (divStart >= 0) {
    const divEnd = masterText.indexOf("\n# ----", divStart + 1);
    const divBlock = masterText.slice(divStart, divEnd < 0 ? undefined : divEnd);
    for (const entry of divBlock.split(/\n  - id: /).slice(1)) {
      const f = entry.match(/\n    fictional: "([^"]+)"/);
      const s = entry.match(/\n    status: "([^"]+)"/);
      if (f && s && s[1].startsWith("採用")) names.push(f[1]);
    }
  }
  if (start < 0) return [...new Set(names)];
  const block = masterText.slice(start);
  for (const line of block.split("\n")) {
    const f = line.match(/fictional: "([^"]+)"/);
    const v = line.match(/verdict: "([^"]+)"/);
    if (f && v && v[1].startsWith("採用")) names.push(f[1]);
  }
  return [...new Set(names)];
}

function check({ masterPath, mapPath }) {
  const master = fs.readFileSync(masterPath, "utf8");
  const map = fs.readFileSync(mapPath, "utf8");
  const missing = adoptedNames(master).filter(n => !map.includes(n));
  return { code: missing.length ? EXIT_MISSING : EXIT_OK, missing };
}

module.exports = { adoptedNames, check, EXIT_OK, EXIT_MISSING };

if (require.main === module) {
  const base = path.join(__dirname, "..");
  const r = check({
    masterPath: path.join(base, "data", "hns_admin_division_master.yaml"),
    mapPath: path.join(base, "docs", "tsunagari.md")
  });
  if (r.code === EXIT_OK) {
    console.log("  OK: つながりの地図に抜けなし");
  } else {
    console.log(`  MISSING: つながりの地図に ${r.missing.length} 件の抜け`);
    for (const n of r.missing) console.log(`    - ${n}`);
  }
  process.exit(r.code);
}
