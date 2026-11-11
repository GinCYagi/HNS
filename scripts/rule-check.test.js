"use strict";
// 決まりの棚卸し（scripts/rule-check.js）の試験
//   node scripts/rule-check.test.js
const assert = require("assert");
const { check } = require("./rule-check");

let pass = 0;
const t = (what, fn) => { try { fn(); console.log(`○ ${what}`); pass++; } catch (e) { console.log(`× ${what}\n    ${e.message}`); process.exitCode = 1; } };

const base = check({ postal: null });
t("字の表の一字の行を読む（田⇄苗・塩⇄潮 ほか）", () => {
  assert.ok(base.table.some(r => r.from === "潮" && r.to === "塩"));
  assert.ok(base.table.some(r => r.from === "田" && r.to === "苗"));
});
t("R1：高田中継局＝鷹田 の 田 が残る名として出る（Gin の名ごとの裁定、字の表より前）", () => {
  assert.ok(base.hits.some(h => h.fic === "鷹田" && h.why.some(w => w.code === "R1")));
});
t("単語の表の言葉（高原・平野）は字として数えない", () => {
  assert.ok(!base.hits.some(h => h.fic === "渡後平野" && h.why.some(w => w.code === "R1")));
});
t("--add 川=河：川 が残る決めた名（翡翠川・閼伽川 ほか）が新しく当たる", () => {
  const r = check({ postal: null, add: ["川=河"] });
  const add = r.hits.filter(h => h.why.some(w => w.code === "ADD"));
  assert.ok(add.length > 0);
  assert.ok(add.some(h => h.fic === "閼伽川"));
});
t("R2：数＋単位 の数は数えない（数の字が単位の前にある名は当たらない）", () => {
  assert.ok(!base.hits.some(h => /五反/.test(h.fic) && h.why.some(w => w.code === "R2")));
});
t("R5：直したあと（Gin「直します」2026-10-25）、央淵川・織瀞川 は当たらず、市の名の 央淵河市 も当たらない", () => {
  const r5 = base.hits.filter(h => h.why.some(w => w.code === "R5")).map(h => h.fic);
  assert.ok(!r5.includes("央淵川") && !r5.includes("織瀞川") && !r5.includes("央淵河市"));
  assert.ok(!r5.includes("伍百川"));
});
t("R5 は rivers の節だけを見る（石川＝湧湯・香川＝飯比古 のような地名は当たらない、C5 の査読）", () => {
  const r5 = base.hits.filter(h => h.why.some(w => w.code === "R5")).map(h => h.fic);
  assert.ok(!r5.includes("湧湯") && !r5.includes("飯比古") && !r5.includes("仏名瀬"));
});
t("R6：そのままの名（verdict に そのまま、または現実と作中が同じ名）は、どれも理由の欄 keep を持つ（DIFF-060、1f6c794）", () => {
  const r6 = base.hits.filter(h => h.why.some(w => w.code === "R6"));
  assert.strictEqual(r6.length, 0, `keep のない そのまま の行：${r6.map(h => `正本:${h.line} ${h.real}`).join("、")}`);
});
t("keep の値は決まった形のどれか（DIFF-026／DIFF-047(元号)／DIFF-060①・②／名ごとの理由）で、そのままの 77 行以上にある", () => {
  const kept = base.names.filter(n => n.keep);
  assert.ok(kept.length >= 77, `keep のある行が ${kept.length}`);
  for (const n of kept) assert.ok(/^(DIFF-026|DIFF-047|DIFF-060[①②])|許容|この行/.test(n.keep), `正本:${n.line} の keep「${n.keep}」が決まった形でない`);
});
console.log(`\n通った ${pass}`);
