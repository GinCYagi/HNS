"use strict";
// =============================================================
// 引き口（scripts/lookup.js）の試験。2026-10-24 の見落としを、出なければ失敗にする。
// docs/proposals/2026-10-24_reference_system.md §1-5・§5-1・§5-2
//   node scripts/lookup.test.js
//   郵便番号データの要る試験は、HNS_POSTAL が無いときは「飛ばした」と出す（通ったとは数えない）。
//   新しい見落としが見つかったら、ここに一つ足す。
// =============================================================
const assert = require("assert");
const fs = require("fs");
const { lookup, morae, sameMorae } = require("./lookup");

const postal = process.env.HNS_POSTAL && fs.existsSync(process.env.HNS_POSTAL) ? process.env.HNS_POSTAL : null;
let pass = 0, skip = 0, todo = 0;
const cases = [];
const t = (id, what, fn, opts = {}) => cases.push({ id, what, fn, ...opts });
const has = (out, s) => assert.ok(out.includes(s), `出てほしいもの「${s}」が出ない`);
// 記録の種（== 正本 など）の中だけを取り出す。提案書の引用で通ってしまわないように
const part = (out, label) => {
  let i = out.indexOf(`\n== ${label}（`);
  if (i < 0) i = out.indexOf(`\n== ${label}\n`);
  if (i < 0) return "";
  const j = out.indexOf("\n== ", i + 4);
  return j < 0 ? out.slice(i) : out.slice(i, j);
};
const inMaster = (out, s) => assert.ok(part(out, "正本").includes(s), `正本の当たりの中に「${s}」が出ない`);

// --- G5 の見落とし
t("G5-1", "京鹿：正本の notes「京→都の置き換えとは別」が出る（京 を残した先例ではない）",
  () => inMaster(lookup("京鹿", { all: true }), "東京→東都の京→都の置き換えとは別"));
t("G5-2", "上ノ道：地方の名の古称の懸念（正本）と、上ノ道市（外した名の辞書）の両方が出る", () => {
  const o = lookup("上ノ道", { all: true });
  inMaster(o, "上ノ道 の懸念");
  inMaster(o, "柳都の上ノ道は前例にしない");
  const d = part(o, "決まり（RUL）・外した名の辞書");
  assert.ok(d.includes("上ノ道市") && d.includes("［外した名の辞書］"), "外した名の辞書に 上ノ道市 が出ない");
});
t("G5-3", "楊湊：前に外した記録（やなぎみなと長いな）が出る", () => {
  const o = lookup("楊湊", { all: true });
  inMaster(o, "やなぎみなと長いな");
  inMaster(o, "［前の名・外した案］");
});
t("G5-4", "参瀬：外した記録が出る", () => inMaster(lookup("参瀬", { all: true }), "三淵・参瀬・閼伽口 は外した"));
t("G5-5", "珠河 たまかわ：元の 玉川 たまがわ と濁りを除いて同じ読みと出る",
  () => has(lookup("珠河", { yomi: "たまかわ", orig: "たまがわ" }), "濁りを除くと元の読みと同じ"));
t("G5-6", "渡前：郵便番号データの町域（鶴岡市・三条市）が出る", () => {
  const o = lookup("渡前", { postal });
  has(o, "鶴岡市");
  has(o, "三条市");
}, { needPostal: true });

// --- M4 の見落とし
t("M4-1", "潮澤 うしおざわ：5拍、元 しおざわ と同じ拍 4/4 と出る", () => {
  const o = lookup("潮澤", { yomi: "うしおざわ", orig: "しおざわ" });
  has(o, "5 拍");
  has(o, "4/4");
  has(o, "★5拍以上");
});
t("M4-2", "汐：汐子区（磯 の元を持つ名）が出る", () => inMaster(lookup("汐", { all: true }), "汐子区"));

// --- C5 の見落とし（docs/reviews/2026-10-24_review_reference_system_C5.md §3）
t("C5-1", "DIFF-016：決まりの文「対の字・近い意味の字」がそのまま出る",
  () => assert.ok(part(lookup("DIFF-016", { all: true }), "決まり（DIFF・保留）").includes("対の字・近い意味の字"), "決まりの当たりに DIFF-016 の文が出ない"));
t("C5-2", "汐平 しおひら：元 しおばら と同じ拍 3/4 と出る",
  () => assert.ok(part(lookup("汐平", { yomi: "しおひら", orig: "しおばら" }), "拍").includes("元と同じ拍 3/4"), "拍の節に 3/4 が出ない"));
t("C5-3", "京鹿（G5-1 と同じ）", () => inMaster(lookup("京鹿", { all: true }), "東京→東都の京→都の置き換えとは別"));
t("C5-4", "野⇄原 で合わない行が索引に出る", null, { todo: "S3（前例の索引）で見る" });
t("C5-5", "戸⇄口 で 万代口 が索引に出る", null, { todo: "S3（前例の索引）で見る" });
t("C5-6", "作中の 磯 の元が 礁 以外を含むと索引に出る", null, { todo: "S3（前例の索引）で見る" });
t("C5-7", "科坂 しなさか（濁らない形で引く。もとの見落としの形）：読みを中に含む町域 石名坂（イシナザカ）が出る",
  () => assert.ok(part(lookup("科坂", { yomi: "しなさか", postal }), "郵便番号データ").includes("石名坂"), "郵便番号データの節に 石名坂 が出ない"), { needPostal: true });
t("C5-8", "潮：郵便番号の「組の数」と「名の数」が両方出る", () => {
  const o = lookup("潮", { postal, max: 1 });
  has(o, "組の数");
  has(o, "名の数");
}, { needPostal: true });
t("C5-9", "泰原：引いた範囲に、郵便番号データは小字を含まないと出る",
  () => has(lookup("泰原", { postal, max: 1 }), "小字・集落は含まない"), { needPostal: true });

// --- 登録の遅れ（M4 の見通せていない点 ア）
t("M4-3", "洛：M4 の未登録の一覧の UA-006（Gin「1はあかんね」）が出る", () => {
  const o = lookup("洛", { all: true });
  has(o, "［未登録の Gin の答え UA-006］");
  has(o, "未登録の Gin の答え」の一覧");
});

// --- 部品
t("部品-1", "拍の数え（小さい字は前と一つ、ッ・ン は一拍）", () => {
  assert.strictEqual(morae("きょうがけん").length, 5);
  assert.strictEqual(morae("さっぽろ").length, 4);
  assert.strictEqual(sameMorae(morae("うしおや"), morae("しおざわ")), 2);
});
t("部品-2", "当たりのない言葉は「ない」と言わず、範囲つきで出す",
  () => has(lookup("〓〓存在しない言葉〓〓"), "「引いて 0（この範囲で）」で、「ない」ではない"));

for (const c of cases) {
  if (c.todo) { console.log(`… ${c.id} まだ（${c.todo}）：${c.what}`); todo++; continue; }
  if (c.needPostal && !postal) { console.log(`－ ${c.id} 飛ばした（HNS_POSTAL がない）：${c.what}`); skip++; continue; }
  try { c.fn(); console.log(`○ ${c.id} ${c.what}`); pass++; }
  catch (e) { console.log(`× ${c.id} ${c.what}\n    ${e.message}`); process.exitCode = 1; }
}
console.log(`\n通った ${pass}・飛ばした ${skip}・まだ ${todo}・合わせて ${cases.length}`);
