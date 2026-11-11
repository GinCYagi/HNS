## 共通文書規則

本プロジェクトの伝達文は、ProCで管理されるDocument Header Standardに従います。

参照コピー：
[`docs/standards/header-standard-current.md`](docs/standards/header-standard-current.md)

管理・更新方法：
[`docs/standards/README.md`](docs/standards/README.md)

## 設計文書

- Canonical Entity Model v0.1（Layer 1中立表現の設計・査読用ドラフト）
  [`docs/design/canonical-entity-model-v0.1.md`](docs/design/canonical-entity-model-v0.1.md)

## ローカル検証

リポジトリのルートで次のコマンドを実行します。

```sh
npm test
```

`package.json` の `test` に並べたテスト（Manifest検証、Canonical Loader、つながり・旧国名・lookup・rule-check の点検、Role Runner）が順に実行されます。Role Runnerのテストには Ruby が要ります。
