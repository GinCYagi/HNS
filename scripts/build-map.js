"use strict";
// =============================================================
// 日ノ本命名マップを作る（依存なし・Node標準のみ）
//
// 正本 data/hns_admin_division_master.yaml から、名前の決まった所を拾い、
// 日本地図（docs/map/japan.topo.json、jpn-atlas BSD-3、元データ 国土地理院 地球地図日本）に
// 色を付けた1枚のページ docs/map/hinomoto_map.html を書き出す。
// Gin「候補が確定したところから日本地図で色が変わる…日の本命名マップみたいな感じで見れるようにして」(2026-10-03)
//
// 地図との対応（現実の名前 → 都道府県・市区町村コード）は下の PLACES に書く。
// 新しい名前を正本に足したら、ここに現実の名前の対応がなければ一行足す。
// =============================================================
const fs = require("fs");
const path = require("path");

const base = path.join(__dirname, "..");
const masterPath = path.join(base, "data", "hns_admin_division_master.yaml");
const topoPath = path.join(base, "docs", "map", "japan.topo.json");
const outPath = path.join(base, "docs", "map", "hinomoto_map.html");
const templatePath = path.join(base, "docs", "map", "map_template.html");

// 現実の名前 → 地図の上の場所。level: region（地方・七道）/ pref（都道府県）/ city（市区町村）
const PLACES = {
  "畿内": { level: "region", prefs: ["26", "27", "29"], note: "五か国（大和・山城・摂津・河内・和泉）を府県の単位で近似" },
  "東海道": { level: "region", prefs: ["08", "11", "12", "14", "19", "22", "24"], note: "常陸・武蔵・房総・相模・甲斐・駿河遠江伊豆・伊賀伊勢志摩を府県の単位で近似（東京＝東都、愛知＝尾張府は県の色）" },
  "南海道": { level: "region", prefs: ["30"], note: "紀伊（和歌山）。四国は二名島の色、淡路は兵庫の一部" },
  "山陽道": { level: "region", prefs: ["33", "34", "35"], note: "岡山・広島・山口で近似（播磨＝兵庫南西部も山陽道）" },
  "山陰道": { level: "region", prefs: ["31", "32"], note: "鳥取・島根で近似（現実の山陰道は丹波・丹後・但馬も含む）" },
  "西海道(本世界の旧称)": { level: "region", prefs: ["40", "41", "42", "43", "44", "45", "46"] },
  "東山道": { level: "region", prefs: ["09", "10", "20", "21", "25"], note: "下野・上野・信濃・美濃飛騨・近江を府県の単位で近似（陸奥・出羽は東北＝陸奥の色）" },
  "北陸道": { level: "region", prefs: ["15", "16", "17", "18"], note: "新潟・富山・石川・福井で近似（現実の北陸道は佐渡も含む）" },
  "東北": { level: "region", prefs: ["02", "03", "04", "05", "06", "07"] },
  "北海道": { level: "region", prefs: ["01"] },
  "四国": { level: "region", prefs: ["36", "37", "38", "39"] },
  "会津": { level: "region", cities: ["07202",  "07208",  "07362",  "07364",  "07367",  "07368",  "07402",  "07405",  "07407",  "07408",  "07421",  "07422",  "07423",  "07444",  "07445",  "07446",  "07447"], note: "会津地方の市町村" },
  "新潟県": { level: "pref", prefs: ["15"] },
  "福島県": { level: "pref", prefs: ["07"] },
  "長野県": { level: "pref", prefs: ["20"] },
  "山形県": { level: "pref", prefs: ["06"] },
  "東京": { level: "pref", prefs: ["13"] },
  "名古屋": { level: "city", cities: ["23100"] },
  "新潟市": { level: "city", cities: ["15100"] },
  "長岡市": { level: "city", cities: ["15202"] },
  "三条市": { level: "city", cities: ["15204"] },
  "柏崎市": { level: "city", cities: ["15205"] },
  "十日町市": { level: "city", cities: ["15210"] },
  "燕市": { level: "city", cities: ["15213"] },
  "上越市": { level: "city", cities: ["15222"] },
  "佐渡市": { level: "city", cities: ["15224"] },
  "いわき市": { level: "city", cities: ["07204"] },
  "会津若松市": { level: "city", cities: ["07202"] },
  "米沢市": { level: "city", cities: ["06202"] },
};

function field(s, key) {
  const m = s.match(new RegExp(key + ': "([^"]*)"'));
  return m ? m[1] : null;
}

function statusOf(verdict) {
  if (!verdict) return "cand";
  if (verdict.startsWith("採用")) return "done";
  if (verdict.includes("条件付き")) return "cond";
  return "cand";
}

function collect(master) {
  const out = [];
  // 一行の { real: ..., fictional: ... } の行（追加分・地方・都市）
  for (const line of master.split("\n")) {
    if (!/\{.*real: "/.test(line)) continue;
    const real = field(line, "real"), fictional = field(line, "fictional");
    if (!real || !fictional || !PLACES[real]) continue;
    let verdict = field(line, "verdict");
    if (!verdict && /rule: "G-0/.test(line)) verdict = /条件付き/.test(line) ? "条件付き" : "採用";
    out.push({ real, fictional, yomi: field(line, "yomi") || "", status: statusOf(verdict), alias: field(line, "alias") || "",
      rule: field(line, "rule") || "", origin: field(line, "origin_memo") || "", memo: field(line, "note") || field(line, "notes") || "", ruling: field(line, "ruling") || "", record: field(line, "record") || "" });
  }
  // admin_divisions のブロック（A000〜）
  const divStart = master.indexOf("admin_divisions:");
  const divEnd = master.indexOf("\n# ----", divStart + 1);
  for (const e of master.slice(divStart, divEnd).split(/\n  - id: /).slice(1)) {
    const real = (e.match(/\n    real: "([^"]+)"/) || [])[1];
    const fictional = (e.match(/\n    fictional: "([^"]+)"/) || [])[1];
    const yomi = (e.match(/\n    yomi: "([^"]+)"/) || [])[1] || "";
    const st = (e.match(/\n    status: "([^"]+)"/) || [])[1] || (e.match(/\n    verdict: "([^"]+)"/) || [])[1];
    const g = k => (e.match(new RegExp("\\n    " + k + ': "([^"]+)"')) || [])[1] || "";
    if (real && fictional && PLACES[real]) out.push({ real, fictional, yomi, status: statusOf(st), rule: g("rule"), origin: g("origin_memo"), ruling: g("ruling"), record: g("record") });
  }
  // 複数行の「  - real: ...」ブロック（cities の名古屋＝尾張府蓬左市など）
  for (const e of master.split(/\n  - real: /).slice(1)) {
    const real = (e.match(/^"([^"]+)"/) || [])[1];
    const fictional = (e.match(/\n    fictional: "([^"]+)"/) || [])[1];
    const yomi = (e.match(/\n    yomi: "([^"]+)"/) || [])[1] || "";
    const verdict = (e.match(/\n    verdict: "([^"]+)"/) || [])[1];
    const g = k => (e.match(new RegExp("\\n    " + k + ': "([^"]+)"')) || [])[1] || "";
    if (real && fictional && PLACES[real]) out.push({ real, fictional, yomi, status: statusOf(verdict), rule: g("rule"), origin: g("origin_memo"), ruling: g("ruling"), record: g("record") });
  }
  // 名古屋は「尾張府蓬左市」で入っている
  const seen = new Set();
  return out.filter(x => (seen.has(x.real) ? false : (seen.add(x.real), true)))
            .map(x => Object.assign(x, PLACES[x.real]));
}

function build() {
  const master = fs.readFileSync(masterPath, "utf8");
  const names = collect(master);
  const topo = fs.readFileSync(topoPath, "utf8");
  const tpl = fs.readFileSync(templatePath, "utf8");
  const stamp = new Date().toISOString().slice(0, 10);
  const html = tpl
    .replace("/*__NAMES__*/[]", JSON.stringify(names))
    .replace("/*__TOPO__*/null", topo.trim())
    .replace("__STAMP__", stamp);
  fs.writeFileSync(outPath, html);
  return names;
}

module.exports = { collect, PLACES };

if (require.main === module) {
  const names = build();
  console.log(`  OK: 日ノ本命名マップ ${names.length} 件 → docs/map/hinomoto_map.html`);
  for (const n of names) console.log(`    ${n.status.padEnd(4)} ${n.real} → ${n.fictional}`);
}
