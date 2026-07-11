# HNS Asset Registry

- Document Status: Draft
- Version: v0.1
- Maintainer: HNS-Crd
- Orchestrator: Gin
- Last Updated: 2026-07-12

## 1. Purpose

本台帳は、HNSプロジェクト内の規則、判断基準、衝突検査、失敗パターン、
設計原則、マスター、手順書および命名成果物を一元的に把握するための管理台帳である。

本台帳への登録は、当該資産の正式採用、妥当性確認またはGinによる裁定完了を意味しない。
確認できない情報は推測せず、`Unknown` または `要確認` とする。

## 2. Asset Registry

| Asset ID | Category | Title | Confidence / Status | Decision Status | Source Document | Dependencies | Review Status | Notes |
|---|---|---|---|---|---|---|---|---|
| DP-001 | DP | 依存階層先行原則 | Established | Approved | 要確認 | 行政区画マスター | Reviewed | 原則本体は裁定済み。D系への適用範囲は再確認対象 |
| FP-001 | FP | 京浜ファミリー | Established | Approved | 要確認 | 親エントリ確定 | Reviewed | 親未確定による派生名の連鎖ブロック事例 |
| FP-003 | FP | 白銀線 | Established | Approved | 要確認 | 音声衝突検査 | Reviewed | 表記検査のみで音声衝突を見落とした事例 |
| — | Master | 行政区画マスター | Draft | Pending | 要確認 | なし | Waiting | 派生命名の親資産 |
| — | Procedure | 音声レビュー手順書 | Draft | Pending | 要確認 | 音声審査規則 | Waiting | v0.1ドラフト提出済み。正式ファイル名は要確認 |

## 3. Gin Decision Queue

| Priority | Decision ID | Target | Question | Recommended Action | Current Status | Decision Date | Notes |
|---|---|---|---|---|---|---|---|
| P0 | HNS-DEC-PENDING-001 | 行政区画マスター | 現行構造を親資産として固定するか | Rev査読後に裁定 | Pending | — | Rev稼働制限中 |
| P1 | HNS-DEC-PENDING-002 | 音声レビュー手順書 | v0.1を正式査読対象とするか | 査読キューへ登録 | Pending | — | 正式ファイル名要確認 |
| P1 | HNS-DEC-PENDING-003 | 実在衝突四軸 | CXとDPのどちらへ分類するか | 原文確認後に裁定 | Pending | — | 独断採番禁止 |
| P1 | HNS-DEC-PENDING-004 | 字義残滓審査 | CXとDPのどちらへ分類するか | 原文確認後に裁定 | Pending | — | 独断採番禁止 |

## 4. Known Gaps

- 各資産のSource Documentが未確定
- JB資産の登録状況が未確認
- CX資産の正式IDおよび採番状況が未確認
- FP資産全体の採番状況が未確認
- DP-002以降の採番状況が未確認
- 行政区画マスターの正式ファイル名および最新版が未確認
- 音声レビュー手順書の正式ファイル名が未確認

## 5. Update Rules

1. Asset IDを独断で新規採番しない。
2. Ginの裁定なしにDecision StatusをApprovedまたはRejectedへ変更しない。
3. ConfidenceとReview Statusを混同しない。
4. 原文未確認の情報は推測で補完しない。
5. Ginの裁定を反映する場合、Decision Dateと根拠文書を記録する。
6. 既存裁定を変更する場合、旧状態を削除せず履歴を保持する。
