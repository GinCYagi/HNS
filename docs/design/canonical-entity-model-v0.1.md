# HNS Canonical Entity Model

Version: 0.1  
Status: Draft for Review  
Phase: Phase1 / P1  
Owner: HNS-Crd  
Review: HNS-Rev  
Implementation: HNS-Imp

---

## 1. Purpose

本設計は、HNSにおける複数の正本・索引・レビュー辞書から取得した情報を、入力ファイル形式およびYAMLライブラリから独立した中立表現へ変換するためのCanonical Entity Modelを定義する。

本モデルは、以下の境界を固定する。

```text
Source File
    ↓
Parser Adapter
    ↓
Parsed Document
    ↓
Canonical Loader
    ↓
Canonical Entity
```

Canonical Entityは、HNS内部処理、検索、検証、派生ビュー生成および将来の保存形式変更に対する共通インターフェースとする。

---

## 2. Scope

本設計の対象は以下とする。

- Canonical Entityのデータ構造
- Parser AdapterとCanonical Loaderの責務境界
- Source VocabularyからCanonical Vocabularyへの変換
- Internal ID
- 親子関係
- Provenance
- エラー形式
- 外部依存分離
- Loader Independenceの検証条件

以下は対象外とする。

- UI表示仕様
- 個別地名の採否
- 命名アルゴリズム
- 音声レビュー手順
- YAMLパーサー製品の恒久固定
- 未裁定データの最終的な意味分類

---

## 3. Design Principles

### 3.1 Layer Separation

各レイヤーの責務を次のとおり分離する。

#### Parser Adapter

責務：

- YAML 1.2互換文書の解析
- 構文エラーの検出
- 入力位置情報の取得
- コメント情報の取得。ただし使用可能な場合に限る
- Parser固有値をParsed Documentへ変換

禁止事項：

- HNS語彙の意味解釈
- Canonical Vocabularyへの変換
- Internal IDの生成
- parent関係の意味解釈
- Provenanceの完成
- 入力値の意味的な補正
- HNS固有の正規化

#### Canonical Loader

責務：

- Source Vocabularyの解釈
- Canonical Vocabularyへの変換
- Internal IDの付与または解決
- parent関係の分離・解決
- Provenanceの生成
- 必須項目検証
- 意味的なエラーの生成
- Canonical Entityの返却

禁止事項：

- YAMLライブラリの直接利用
- Parser固有型の参照
- Parser固有例外の捕捉
- YAML構文そのものの解析

#### Canonical Entity

責務：

- HNS内部で使用する中立データ表現
- 入力ファイル形式から独立した意味情報の保持
- Internal IDによる安定参照
- Provenanceによる根拠追跡

禁止事項：

- YAML ASTの保持
- YAMLライブラリ型の保持
- ファイル行番号を識別子として使用すること
- 表示名を永続識別子として使用すること

---

### 3.2 Loader Independence

以下を必須条件とする。

#### PI-01

Parser Adapter以外のモジュールは、YAMLライブラリを直接参照してはならない。

対象となる直接参照には以下を含む。

- import
- require
- Parser固有型
- Parser固有例外
- Parser固有ノード
- Parser固有API

#### PI-02

Parser Adapterをモック実装へ置換した状態で、Canonical Loaderの単体テストが成立しなければならない。

---

### 3.3 Stable Identity

Internal IDは永続識別子とする。

表示名は変更可能とし、Internal IDから分離する。

以下をInternal IDの構成根拠としてはならない。

- 行番号
- 配列位置
- 表示順序
- YAMLノード位置
- コメント位置
- 一時的な表示名のみ

---

### 3.4 Provenance First

Canonical Entityは、根拠情報を `provenance[]` として保持する。

Canonical Entityの意味情報は、少なくとも1件のProvenanceへ追跡可能でなければならない。

---

## 4. Canonical Entity Definition

### 4.1 Type Definition

```ts
type CanonicalEntity = {
  id: CanonicalEntityId;
  entityType: CanonicalEntityType;

  canonicalName: string;
  displayNames: DisplayName[];

  status: CanonicalStatus;
  confidence: CanonicalConfidence | null;

  parentId: CanonicalEntityId | null;
  relations: CanonicalRelation[];

  attributes: Record<string, CanonicalValue>;
  tags: string[];

  provenance: ProvenanceRecord[];

  sourceState: SourceState;
  notes: CanonicalNote[];

  createdAt: string | null;
  updatedAt: string | null;
};
```

### 4.2 Field Specification

#### `id`

```ts
type CanonicalEntityId = string;
```

null許容：不可

HNS内部でエンティティを一意に参照する永続識別子。

要件：

- 同一エンティティでは再読込後も維持される
- 表示名変更の影響を受けない
- 行番号変更の影響を受けない
- ファイル内位置変更の影響を受けない
- Canonical LoaderまたはID Registryによって解決される

#### `entityType`

```ts
type CanonicalEntityType =
  | "administrative_area"
  | "geographic_name"
  | "railway_operator"
  | "railway_line"
  | "station"
  | "road_operator"
  | "road"
  | "review_term"
  | "rule"
  | "decision_record"
  | "unknown";
```

null許容：不可

`unknown` は入力を棄却しないための退避値であり、最終分類を意味しない。

#### `canonicalName`

型：`string`  
null許容：不可

- 空文字不可
- 永続識別子として使用しない
- 表示名変更により更新可能
- Source Vocabularyをそのまま格納するとは限らない

#### `displayNames`

```ts
type DisplayName = {
  value: string;
  language: string | null;
  script: string | null;
  usage: "primary" | "alias" | "reading" | "abbreviation" | "historical" | "other";
};
```

null許容：配列自体は不可  
空配列：許容

#### `status`

```ts
type CanonicalStatus =
  | "active"
  | "draft"
  | "pending"
  | "deprecated"
  | "rejected"
  | "unknown";
```

null許容：不可

#### `confidence`

```ts
type CanonicalConfidence =
  | "established"
  | "candidate"
  | "hypothesis"
  | "deprecated";
```

null許容：可

`status` と `confidence` は別概念とし、相互に自動変換しない。

#### `parentId`

型：`CanonicalEntityId | null`  
null許容：可

- 入力上のparent表現をそのまま保持しない
- Canonical LoaderがInternal IDへ解決する
- 親未解決時は `null` とし、未解決情報をProvenanceまたはNoteへ残す
- 行番号や配列位置を参照しない

複数親が必要な関係は `relations[]` を使用する。

#### `relations`

```ts
type CanonicalRelation = {
  type: CanonicalRelationType;
  targetId: CanonicalEntityId;
  qualifiers: Record<string, CanonicalValue>;
  provenanceRefs: string[];
};

type CanonicalRelationType =
  | "parent"
  | "child"
  | "derived_from"
  | "alias_of"
  | "operated_by"
  | "located_in"
  | "connects_to"
  | "reviewed_by"
  | "conflicts_with"
  | "related_to";
```

null許容：配列自体は不可  
空配列：許容

#### `attributes`

```ts
type CanonicalValue =
  | string
  | number
  | boolean
  | null
  | CanonicalValue[]
  | { [key: string]: CanonicalValue };
```

null許容：オブジェクト自体は不可  
空オブジェクト：許容

制約：

- Parser固有型を格納しない
- YAMLノードを格納しない
- 関係情報を無制限にattributesへ退避しない
- 共通性が確認された属性は将来の版で正式フィールドへ昇格可能

#### `tags`

型：`string[]`  
null許容：不可  
空配列：許容

#### `provenance`

```ts
type ProvenanceRecord = {
  provenanceId: string;
  sourceClass: ProvenanceSourceClass;
  sourceId: string;
  sourcePath: string | null;
  sourceKey: string | null;
  sourceLocation: SourceLocation | null;
  sourceValue: CanonicalValue;
  role: ProvenanceRole;
  note: string | null;
};
```

null許容：配列自体は不可  
空配列：原則不可

#### `sourceState`

```ts
type SourceState =
  | "resolved"
  | "partially_resolved"
  | "pending"
  | "invalid";
```

null許容：不可

#### `notes`

```ts
type CanonicalNote = {
  code: string;
  message: string;
  severity: "info" | "warning" | "error";
  provenanceRefs: string[];
};
```

null許容：配列自体は不可  
空配列：許容

#### `createdAt`

型：ISO 8601文字列または `null`  
null許容：可

入力ソースで明示された作成日時。ファイルシステムの作成日時を自動的に正本値として採用しない。

#### `updatedAt`

型：ISO 8601文字列または `null`  
null許容：可

入力ソースで明示された更新日時。Gitコミット日時やファイル更新日時を自動的に意味上の更新日時へ変換しない。

---

## 5. Provenance Model

### 5.1 Source Class

```ts
type ProvenanceSourceClass =
  | "primary_source"
  | "review_dictionary"
  | "index"
  | "decision_log"
  | "derived"
  | "unknown";
```

| Source Class | 対象 |
|---|---|
| `primary_source` | 行政区分マスター |
| `review_dictionary` | Review Dictionary |
| `index` | 索引 |
| `decision_log` | decisions.json |
| `derived` | Canonical Entityから生成された派生情報 |
| `unknown` | 未分類ソース |

`decisions.json` のCanonical Entity統合方式は未裁定であるが、ProvenanceのSource Classとしては識別可能にする。

### 5.2 Provenance Role

```ts
type ProvenanceRole =
  | "definition"
  | "name"
  | "classification"
  | "parent"
  | "attribute"
  | "status"
  | "review"
  | "decision"
  | "reference";
```

### 5.3 Source Location

```ts
type SourceLocation = {
  documentIndex: number | null;
  line: number | null;
  column: number | null;
};
```

Source Locationは監査・診断用情報であり、Internal ID生成や同一性判定には使用しない。

---

## 6. Vocabulary Layer

### 6.1 Purpose

```text
Source Vocabulary
    ↓
Vocabulary Mapping
    ↓
Canonical Vocabulary
```

Parser AdapterはVocabulary Mappingを行わない。

### 6.2 Source Vocabulary

Source Vocabularyは、入力文書上のキー、分類値、状態値および関係表現を指す。

### 6.3 Canonical Vocabulary

初期対象：

- CanonicalEntityType
- CanonicalStatus
- CanonicalConfidence
- CanonicalRelationType
- ProvenanceSourceClass
- ProvenanceRole
- SourceState

### 6.4 Mapping Result

```ts
type VocabularyMappingResult<T> =
  | {
      ok: true;
      value: T;
      sourceValue: CanonicalValue;
      mappingId: string;
    }
  | {
      ok: false;
      sourceValue: CanonicalValue;
      error: CanonicalLoadError;
    };
```

未知語彙は、以下のいずれかで処理する。

- 安全な退避値 `unknown` へ変換
- 属性として保持
- 意味解釈不能としてエラー化

未知語彙を推測によって既知値へ変換してはならない。

### 6.5 Draft Vocabulary

```text
draft → status: "draft"
```

ただし、Draftが状態、信頼度、文書成熟度のいずれを意味するかはソースごとに確認する。

一律に `confidence: "candidate"` へ変換してはならない。

---

## 7. Parser Adapter Interface

### 7.1 Interface

```ts
interface ParserAdapter {
  parse(input: ParserInput): Promise<ParserResult>;
}

type ParserInput = {
  sourceId: string;
  sourcePath: string | null;
  content: string;
};

type ParserResult =
  | {
      ok: true;
      document: ParsedDocument;
    }
  | {
      ok: false;
      error: ParserAdapterError;
    };
```

### 7.2 Parsed Document

```ts
type ParsedDocument = {
  sourceId: string;
  sourcePath: string | null;
  value: ParsedValue;
  metadata: ParsedDocumentMetadata;
};

type ParsedValue =
  | string
  | number
  | boolean
  | null
  | ParsedValue[]
  | { [key: string]: ParsedValue };

type ParsedComment = {
  value: string;
  location: SourceLocation | null;
  path: string | null;
};

type ParsedLocationIndex = Record<string, SourceLocation>;

type ParsedDocumentMetadata = {
  parserFormat: "yaml";
  specification: "YAML 1.2";
  comments: ParsedComment[];
  locations: ParsedLocationIndex;
};
```

null許容：

- `comments` 配列自体：不可。空配列可
- `ParsedComment.value`：不可
- `ParsedComment.location`：可
- `ParsedComment.path`：可
- `locations` オブジェクト自体：不可。空オブジェクト可
- `SourceLocation` 内の各値：可

Parser固有型はParsed Document境界より外へ出してはならない。

### 7.3 Parser Error

```ts
type ParserAdapterError = {
  layer: "parser";
  code:
    | "PARSER_SYNTAX_ERROR"
    | "PARSER_UNSUPPORTED_FEATURE"
    | "PARSER_INPUT_ERROR"
    | "PARSER_INTERNAL_ERROR";
  message: string;
  sourceId: string;
  location: SourceLocation | null;
  cause: unknown;
};
```

`cause` はParser Adapter内部の診断用とし、Canonical Loaderへ直接渡さない。

---

## 8. Canonical Loader Interface

### 8.1 Interface

```ts
interface CanonicalLoader {
  load(input: CanonicalLoadInput): Promise<CanonicalLoadResult>;
}

type CanonicalLoadInput = {
  document: ParsedDocument;
  sourceProfile: SourceProfile;
  idResolver: CanonicalIdResolver;
  vocabularyMapper: VocabularyMapper;
};
```

### 8.2 Source Profile

```ts
type SourceProfile = {
  sourceClass: ProvenanceSourceClass;
  entitySelector: string;
  fieldMappings: FieldMapping[];
  requiredFields: string[];
  unknownFieldPolicy: "preserve" | "warn" | "reject";
};
```

### 8.3 Loader Result

```ts
type CanonicalLoadResult = {
  entities: CanonicalEntity[];
  errors: CanonicalLoadError[];
  warnings: CanonicalLoadWarning[];
};
```

部分成功を許容する。

### 8.4 Loader Error

```ts
type CanonicalLoadError = {
  layer: "loader";
  code:
    | "LOAD_STRUCTURE_INVALID"
    | "LOAD_REQUIRED_FIELD_MISSING"
    | "LOAD_VOCABULARY_UNMAPPED"
    | "LOAD_ID_UNRESOLVED"
    | "LOAD_ID_REGISTRY_CONFLICT"
    | "LOAD_PARENT_UNRESOLVED"
    | "LOAD_DUPLICATE_ID"
    | "LOAD_PROVENANCE_MISSING"
    | "LOAD_TYPE_INVALID"
    | "LOAD_POLICY_VIOLATION";
  message: string;
  sourceId: string;
  sourceKey: string | null;
  location: SourceLocation | null;
  severity: "error";
};
```

### 8.5 Loader Warning

```ts
type CanonicalLoadWarning = {
  layer: "loader";
  code:
    | "WARN_UNKNOWN_FIELD_PRESERVED"
    | "WARN_UNKNOWN_VOCABULARY"
    | "WARN_PARENT_DEFERRED"
    | "WARN_PARTIAL_PROVENANCE"
    | "WARN_DRAFT_SEMANTICS";
  message: string;
  sourceId: string;
  sourceKey: string | null;
  location: SourceLocation | null;
  severity: "warning";
};
```

---

## 9. Internal ID Resolution

### 9.1 Resolver Interface

```ts
interface CanonicalIdResolver {
  resolve(input: CanonicalIdInput): Promise<CanonicalIdResult>;
}

type CanonicalIdInput = {
  sourceClass: ProvenanceSourceClass;
  sourceId: string;
  sourceKey: string | null;
  entityType: CanonicalEntityType;
  stableSourceIdentifier: string | null;
  canonicalName: string;
};
```

### 9.2 Resolution Priority

Internal IDは次の優先順位で解決する。

1. ソース内に明示された正式かつ安定したID
2. 既存ID Registryとの一致
3. 名称・種別その他の属性による既存Canonical Entityとの同一性照合
4. 新規ID発行

追加規則：

- 正本内の正式IDとID Registryが不一致の場合、正本内の正式IDを採用する。
- 不一致となったRegistry記録は自動上書きせず、`LOAD_ID_REGISTRY_CONFLICT` として通知する。
- 表示名だけを根拠に自動統合してはならない。
- 曖昧一致は新規ID発行へ直行させず、要レビュー状態として隔離する。

### 9.3 ID Format

v0.1ではID形式を次の抽象条件に限定する。

- 文字列
- HNS内で一意
- 永続
- 表示名非依存
- 行番号非依存
- Parser非依存

具体的な文字列表現は実装規約へ委ねる。

実装規約は、Gin裁定で示されたプロジェクト名前空間付きID例（例：`HNS:REJ:001`）およびP系ID衝突回避の修飾形式（例：`HNS:P-06`）を継承し、HNS外部または別ID体系との衝突を防止しなければならない。

---

## 10. Parent Resolution

parent入力はCanonical Loaderが次の手順で処理する。

1. Source Vocabulary上のparent値を取得
2. 親候補のSource Identifierを抽出
3. ID Resolverへ照会
4. 一意解決できた場合は `parentId` へ設定
5. 解決不能の場合は `parentId: null`
6. `sourceState: "partially_resolved"` または `"pending"` を設定
7. WarningおよびProvenanceを残す

親未解決を理由に子エンティティ全体を必ず棄却する設計とはしない。

---

## 11. External Dependency Policy

設計仕様では、特定のYAMLライブラリを固定しない。

```text
YAML 1.2 Compatible Parser
```

実装時の第一候補は `yaml` パッケージとするが、これは実装選択でありCanonical Entity Modelの仕様ではない。

ライブラリ変更時にも、以下は不変でなければならない。

- ParsedDocument Interface
- Canonical Loader Interface
- Canonical Entity
- Loaderテスト
- Vocabulary Mapping
- Internal ID
- Provenance Model

---

## 12. Verification Requirements

### 12.1 P0

受入不可条件：

- Loader以降にYAMLライブラリのimportが存在する
- LoaderがParser固有型を受け取る
- Parser AdapterがCanonical Vocabulary変換を行う
- Internal IDが行番号に依存する
- Canonical EntityがProvenanceを持たない
- 表示名が唯一の永続識別子として使用される

Exit Criteria：

- 静的検索でParser Adapter外のYAML直接依存が0件
- モックParserによるLoaderテストが成功
- 行順変更後も同一Entity IDが維持される
- 表示名変更後も同一Entity IDが維持される

Evidence：

- automated
- implementation

### 12.2 P1

- Source Vocabularyの未知値が無言で推測変換されない
- parent未解決時に診断情報が残る
- ProvenanceからSource IDへ追跡できる
- 部分成功時に成功Entityと失敗情報が同時返却される
- Source LocationがID生成に使われていない

Exit Criteria：

- 各項目に最低1件の自動テスト
- 未確認項目はKnown Issueへ登録

### 12.3 P2

- コメント保持可能なParserでコメントMetadataを取得できる
- Parser差し替え比較テスト
- 大規模入力時の性能測定
- Error Messageの可読性確認

---

## 13. Initial Test Cases

- CE-01: Basic Primary Source
- CE-02: Rename Stability
- CE-03: Row Movement
- CE-04: Parser Mock
- CE-05: Unknown Vocabulary
- CE-06: Unresolved Parent
- CE-07: Parser Isolation
- CE-08: Partial Success

各テストは§12のExit Criteriaを直接検証する。

---

## 14. Implementation Order

1. Canonical Entity型
2. ParsedDocument型
3. Parser Adapter Interface
4. Canonical Loader Interface
5. Error型
6. Provenance型
7. Vocabulary Mapper
8. ID Resolver Interface
9. モックParserによるLoaderテスト
10. YAML 1.2 Compatible Parser Adapter
11. Primary Source Profile
12. Review Dictionary Profile
13. Index Profile

YAML Parser Adapterより前に、モックParsedDocumentを使用したLoaderテストを成立させる。

---

## 15. Review Checklist for HNS-Rev

### Layer Separation

- Parser Adapterに意味変換が混入していない
- Loaderに構文解析が混入していない
- EntityにParser型が混入していない

### Loader Independence

- Parser Adapterをモック置換できる
- LoaderテストがYAML入力を必要としない

### Parser Isolation

- Parser Adapter外にYAMLライブラリ参照が存在しない
- Parser固有例外がLoaderへ漏れていない

### Identity

- IDが行番号・表示順・表示名だけに依存していない
- parentがInternal IDへ解決されている
- 正本内正式IDがRegistryより優先される

### Provenance

- Primary Source、Review Dictionary、索引が区別される
- Source Locationが監査情報としてのみ使用される

---

## 16. Items Requiring Gin Adjudication

### GIN-PENDING-01

Pending Sourceに対して、Primary Sourceと同じProvenanceおよび優先順位規則を類推適用するか。

暫定処理：

```text
sourceClass: "unknown"
sourceState: "pending"
```

### GIN-PENDING-02

`decisions.json` 4件を以下のどちらとして扱うか。

A. `decision_record` Canonical Entityとして統合  
B. Canonical Entityから参照される派生ビューとして保持

暫定処理：

- Provenance Source Classとして `decision_log` を定義
- Entity化は実施しない
- 将来の統合を妨げないInterfaceのみ確保

### GIN-PENDING-03

Draft語彙をCanonical Vocabulary上で以下のどこへ位置付けるか。

- CanonicalStatus
- CanonicalConfidence
- 文書成熟度
- ソース固有属性

暫定処理：

- 状態を意味することが明確な場合のみ `status: "draft"`
- Confidenceへ自動変換しない
- 不明な場合は属性保持＋Warning

---

## 17. Completion Condition

- Canonical Entity各フィールドの型とnull許容が定義されている
- Vocabulary Layerが定義されている
- Parser Adapter Interfaceが定義されている
- Canonical Loader Interfaceが定義されている
- Error形式が定義されている
- External Dependency Policyが本文へ統合されている
- Loader Independenceの検証条件が定義されている
- 未裁定事項が設計本文から隔離されている
- HNS-Rev査読へ回付可能である

---

End of Document
