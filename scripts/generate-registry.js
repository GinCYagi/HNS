const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const assets = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "assets.json"), "utf8"));
const decisions = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "decisions.json"), "utf8"));

const esc = value => String(value ?? "—").replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
const deps = value => Array.isArray(value) && value.length ? value.join("、") : "なし";

let out = `# HNS Asset Registry

- Document Status: Draft
- Version: v0.1
- Maintainer: HNS-Crd
- Orchestrator: Gin
- Last Updated: ${assets.updatedAt}

## 1. Purpose

本台帳は、HNSプロジェクト内の規則、判断基準、衝突検査、失敗パターン、
設計原則、マスター、手順書および命名成果物を一元的に把握するための管理台帳である。

本台帳への登録は、当該資産の正式採用、妥当性確認またはGinによる裁定完了を意味しない。
確認できない情報は推測せず、\`Unknown\` または \`要確認\` とする。

## 2. Asset Registry

| Asset ID | Category | Title | Confidence / Status | Decision Status | Source Document | Dependencies | Review Status | Notes |
|---|---|---|---|---|---|---|---|---|
`;

for (const a of assets.assets) {
  out += `| ${esc(a.assetId)} | ${esc(a.category)} | ${esc(a.title)} | ${esc(a.confidenceStatus)} | ${esc(a.decisionStatus)} | ${esc(a.sourceDocument)} | ${esc(deps(a.dependencies))} | ${esc(a.reviewStatus)} | ${esc(a.notes)} |\n`;
}

out += `
## 3. Gin Decision Queue

| Priority | Decision ID | Target | Question | Recommended Action | Current Status | Decision Date | Notes |
|---|---|---|---|---|---|---|---|
`;

for (const d of decisions.decisions) {
  out += `| ${esc(d.priority)} | ${esc(d.decisionId)} | ${esc(d.target)} | ${esc(d.question)} | ${esc(d.recommendedAction)} | ${esc(d.status)} | ${esc(d.decisionDate)} | ${esc(d.note)} |\n`;
}

out += `
## 4. Known Gaps

`;
for (const gap of assets.knownGaps) out += `- ${gap}\n`;

out += `
## 5. Update Rules

1. Asset IDを独断で新規採番しない。
2. Ginの裁定なしにDecision StatusをApprovedまたはRejectedへ変更しない。
3. ConfidenceとReview Statusを混同しない。
4. 原文未確認の情報は推測で補完しない。
5. Ginの裁定を反映する場合、Decision Dateと根拠文書を記録する。
6. 既存裁定を変更する場合、旧状態を削除せず履歴を保持する。
`;

const output = path.join(ROOT, "docs", "registries", "hns-asset-registry.md");
fs.writeFileSync(output, out, "utf8");
console.log(`Generated: ${output}`);
