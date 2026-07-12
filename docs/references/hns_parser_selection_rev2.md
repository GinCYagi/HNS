# 【HNS】Reference｜YAMLパーサ選定資料 Revision 2

- 文書種別：Reference（設計添付資料）
- 版：Revision 2
- 原版作成：HNS-Imp-local（Revision 1、オフライン作成・時点依存値を意図的に不記載）
- 改訂：HNS-Rev（Web実測統合、実測日：2026-07-12）
- 位置付け：Canonical Entity Model v0.1「Loader Requirements」章の添付資料
- 用途：Imp実装時の選定判断材料。設計仕様はライブラリ名を固定しない（要求仕様「YAML 1.2 Compatible Parser」のみ固定）

---

## 1. 要求仕様（確定済み・変更なし）

パーサ実験（Imp実施・Rev独立再計測で全数値一致）により確定した必要機能：

- 必要：Flow Mapping／Flow Sequence／Block Mapping／Folded Scalar（>-）／UTF-8キー（日本語キー）／null／深い異種ネスト（最大10）
- 不要（現正本コーパスで不使用）：Anchor／Alias／Merge Key

## 2. 候補比較表（Revision 2：Rev実測反映）

| 候補 (npm) | YAML対応 | 必要機能の充足 | 最新安定版（実測） | ランタイム依存 | ライセンス | 保守状況（実測） | 特記事項 |
|---|---|---|---|---|---|---|---|
| **yaml**（eemeli） | 1.1 & 1.2両対応 | 全充足 | v2.8.4（2026-05-02公開） | ゼロ | ISC | 活発（Snyk判定：Healthy、脆弱性報告0） | コメント・空行の保持（往復編集）に対応。**v3.0.0プレリリースがnextタグで進行中**（デフォルトエクスポート廃止等の破壊的変更予定）→採用時はv2系固定＋lockfile必須 |
| **js-yaml** | **1.2 & 1.1両対応（v5系）** ※Rev.1の「1.1中心」はv4時点の情報につき修正 | 全充足 | v5系（v4→v5移行ガイド公開済み） | ゼロ | MIT | 活発（Snyk判定：Healthy、リポジトリ活動2026-06確認） | YAML Test Suite全通過を明記。レガシー1.1型（暗黙真偽値・マージキー等）はYAML11_SCHEMAへ分離され既定で無効。maxDepth等の安全機構追加 |
| yamljs | 1.2部分 | 一部（フロー/折畳みで難あり報告） | — | ゼロ | MIT | 低調 | 参考掲載・非推奨 |
| yaml-ast-parser | 1.1系AST | AST用途特化 | — | ゼロ | Apache-2.0 | 低調 | 参考掲載・非推奨。※類似名のyaml-jsは開発放棄・リポジトリアーカイブ済みが公式に明言されており、名称混同に注意 |

## 3. Revision 1からの変更点（差分明示）

1. **js-yamlの特徴付けを修正**：「1.1中心（1.2の一部挙動）」→「v5系で1.2/1.1両対応・Test Suite全通過」。Rev.1の記載はv4時点では正確だったが、現行版には当たらない。
2. **時点依存値を実測で充填**：最新版・公開日・保守判定・脆弱性状況（実測日2026-07-12、出典：npm／Snyk／GitHub）。
3. **yaml v3プレリリース進行中の注意を追加**：v2系固定推奨。
4. 上記1の帰結として、**「YAML 1.2準拠度」は両有力候補間の差別化要因ではなくなった**（前提条件化）。

## 4. 選定基準（Crd確定順序・Revision 2で改訂）

YAML 1.2対応は前提条件とし、差別化基準は以下の順とする：

1. Loader Independence（Parser Adapter隔離との適合）
2. コメント・構造保持能力（Registry/Markdown再生成・将来のGUI編集との親和性）
3. 保守性
4. API安定性
5. 性能

## 5. 適合の要点（Revision 2結論）

- **両有力候補（yaml／js-yaml v5）とも要求仕様を満たす**。どちらを選んでも設計は成立する（Loader Independence／External Dependency Policyにより交換可能）。
- 基準2（コメント・構造保持）で **yaml（eemeli）が優位** ——Crd実装推奨第一候補の結論はRevision 2の事実の下でも維持。ただし推奨根拠から「1.2準拠の差」は除外し、往復編集能力を主根拠とする。
- 基準4（API安定性）では js-yaml v5 にも分がある（yamlはv3破壊的変更を控える）。yaml採用時はv2系固定で本リスクを遮断する。
- 導入時の付随作業（共通）：package.jsonへの依存追加、lockfileコミット、`.gitignore`へ`node_modules/`追記。

## 6. 実装注記（Loader Requirements章への転記推奨）

- 採用ライブラリのバージョンは**メジャー固定**（例：yaml `^2`）とし、lockfileをコミットする。
- ライブラリのimport／固有型／固有例外はParser Adapter 1モジュールに閉じる（Rev査読観点「Parser Isolation」の確認対象）。
- Adapterの責務は構文解析（YAML→JSオブジェクト）のみ。正規化はCanonical Loaderへ（Crd確定の責務分離）。

## 7. 計測来歴（P-04監査証跡）

- Revision 1：HNS-Imp-local、オフライン作成、時点依存値を意図的に非記載（推測での確定を回避）。
- Revision 2実測：HNS-Rev（-web）、2026-07-12、出典：npmレジストリ・Snyk・GitHub（eemeli/yaml、nodeca/js-yaml）。
- 機能使用調査の数値：Imp計測（Node実装）とRev再計測（独立スクリプト）の二重計測で全セル一致（2026-07-12確定）。
