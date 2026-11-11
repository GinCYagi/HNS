"use strict";
// =============================================================
// 置き換えの影響の見立て（シミュレーション）
//
// 「ある字（言葉）を別の字に替えたら、どこに何件効くか」を数える。
//   node scripts/impact.js <替える前> <替えた後> [範囲] [--postal <utf_ken_all.csv>]
//   範囲：全国（既定）／県名（新潟県）／市区町村名（新潟市・新潟市中央区）
// 例：node scripts/impact.js 湊 港湾 新潟市 --postal ~/postal/utf_ken_all.csv
//
// 見るもの
//   1. 郵便番号の町域：範囲の中で、その字を含む町名と、替えた後の名前
//   2. 替えた後の名前が、全国のどこかにすでにある（DIFF-021 の当たり）
//   3. 正本（hns_admin_division_master.yaml）で、その字を使っている日ノ本の名前と現実の名前
//   4. つながりの地図（docs/tsunagari.md）で、その字が出てくる行
// 郵便番号データはリポジトリに入れていないので、--postal で場所を渡す。
// =============================================================
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const pi = args.indexOf("--postal");
const postalPath = pi >= 0 ? args.splice(pi, 2)[1] : null;
const [from, to, scope] = args;
if (!from || to === undefined) {
  console.error("使い方：node scripts/impact.js <替える前> <替えた後> [範囲] [--postal <csv>]");
  process.exit(1);
}
const base = path.join(__dirname, "..");
const master = fs.readFileSync(path.join(base, "data", "hns_admin_division_master.yaml"), "utf8");
const tsunagari = fs.readFileSync(path.join(base, "docs", "tsunagari.md"), "utf8");

// 郵便番号データ（CSV、ダブルクォートつき）
function readPostal(p) {
  return fs.readFileSync(p, "utf8").split(/\r?\n/).filter(Boolean).map(l => l.split(",").map(c => c.replace(/^"|"$/g, "")))
    .map(c => ({ pref: c[6], city: c[7], town: c[8], kana: c[5] }))
    .filter(r => r.town && r.town !== "以下に掲載がない場合");
}
const inScope = r => !scope || r.pref === scope || r.city === scope || r.city.startsWith(scope);

const out = [];
const say = s => out.push(s);
say(`# 置き換えの影響：「${from}」→「${to}」${scope ? `（範囲：${scope}）` : "（範囲：全国）"}`);
say("");

if (postalPath) {
  const rows = readPostal(postalPath);
  const allNames = new Map();
  for (const r of rows) allNames.set(r.town, (allNames.get(r.town) || 0) + 1);
  const hit = rows.filter(r => inScope(r) && r.town.includes(from));
  const uniq = new Map();
  for (const r of hit) { const k = r.city + "｜" + r.town; if (!uniq.has(k)) uniq.set(k, r); }
  say(`## 1. 郵便番号の町域（${uniq.size}件）`);
  say("");
  say("| 市区町村 | いまの町名 | 替えた後 | 替えた後と同じ名前が全国に | 替える前の名前の全国の数 |");
  say("|---|---|---|---|---|");
  const clashes = [];
  for (const r of uniq.values()) {
    const after = r.town.split(from).join(to);
    const n = allNames.get(after) || 0;
    if (n) clashes.push(`${r.city}${r.town} → ${after}（全国に${n}件）`);
    say(`| ${r.city} | ${r.town} | ${after} | ${n ? n + "件" : "なし"} | ${allNames.get(r.town)}件 |`);
  }
  say("");
  say(`## 2. 替えた後の名前が、すでにある（DIFF-021 の当たり、${clashes.length}件）`);
  say("");
  say(clashes.length ? clashes.map(c => "- " + c).join("\n") : "- なし");
  // 範囲の外にある同じ字の町名の数（そろえるかの目安）
  const outside = rows.filter(r => !inScope(r) && r.town.includes(from));
  say("");
  say(`参考：範囲の外で「${from}」を含む町域は ${new Set(outside.map(r => r.city + r.town)).size} 件。`);
  say("");
} else {
  say("（郵便番号データの場所が渡されていないので、町域は数えていない。--postal で渡す）");
  say("");
}

// 3. 正本
const lines = master.split("\n");
const canonHits = [];
for (const l of lines) {
  const real = (l.match(/real: "([^"]*)"/) || [])[1] || "";
  const fic = (l.match(/fictional: "([^"]*)"/) || [])[1] || "";
  if (!real.includes(from) && !fic.includes(from)) continue;
  const v = (l.match(/verdict: "([^"]*)"/) || [])[1] || "";
  canonHits.push(`| ${real || "—"} | ${fic || "—"} | ${v || "—"} | ${fic.includes(from) ? "日ノ本の名に「" + from + "」が残っている" : "現実の名にだけある（日ノ本ではもう替わっている）"} |`);
}
say(`## 3. 正本の中（${canonHits.length}件）`);
say("");
if (canonHits.length) { say("| 現実 | 日ノ本 | 判定 | 見立て |"); say("|---|---|---|---|"); canonHits.forEach(h => say(h)); }
else say("- なし");
say("");

// 4. つながりの地図
const tHits = tsunagari.split("\n").filter(l => l.startsWith("|") && l.includes(from));
say(`## 4. つながりの地図（${tHits.length}行）`);
say("");
say(tHits.length ? tHits.map(l => "- " + l.split("|").slice(1, 4).map(s => s.trim()).join("｜")).join("\n") : "- なし");
say("");
console.log(out.join("\n"));
