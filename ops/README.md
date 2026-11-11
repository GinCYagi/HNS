# HNS Role Runner PoC

`HNS-Crd-local` がYAML Taskを読み、実装、テスト、査読、minor差戻しを最大3往復まで実行するローカル用PoCです。正典変更、Decision、受入テスト変更、moderate以上の指摘、競合する推奨を検出すると停止し、Ginへ裁定を返します。pushとmergeは行いません。

正典と受入テストの保護はRuntimeの自己申告だけに依存しません。`policy.yaml` の `protected_paths` に一致するファイルを実装前にSHA-256で記録し、実装、テスト、査読の各段階後に追加・変更・削除を検査します。

## 実行

```sh
ops/run-cycle.sh ops/tasks/<task>.yaml
```

第2引数には検証用のRuntime Mapを指定できます。

```sh
ops/run-cycle.sh ops/tasks/<task>.yaml /path/to/test-runtime-map.yaml
```

Runtimeごとの実行コマンドは `runtime-map.yaml` に集約しています。Task側でテストを指定するときは次の形にします。省略時は `policy.yaml` の既定値を使います。

```yaml
execution:
  test_command: ["npm", "test"]
```

## 保存物とGit追跡

- `work/<run-id>/`: Taskコピー、実装Runtime入出力、テスト結果、生ログ
- `reviews/<run-id>/`: 査読Runtime入出力（実行単位の一時成果物）
- `state/<run-id>.yaml`: 最後に確定保存された状態
- `results/<run-id>.yaml`: 終了Receipt
- `decisions/<run-id>-gin-request.yaml`: 裁定停止時のGin向けDecisionRequest（Decisionそのものではない）

これらは実行生成物であり、環境情報やRuntime出力を含み得るため、すべてGit追跡対象外です。回帰試験に固定データが必要な場合だけ、ローカル絶対パスとRuntime生出力を除去した最小データを `ops/test/fixtures/` に置きます。

統合判断の根拠となる正式ReviewはRuntime生成Reviewと分離し、`integration/` に保存してGit追跡します。正式Reviewからは、同じく追跡対象で実在する正式ReviewまたはReceiptだけを参照します。

Runtime異常や不正YAMLを含む失敗でも、取得済み出力、ログ、状態、Receiptを可能な限り残します。終了コードは正常完了が `0`、裁定待ち・上限到達・失敗が `2`、引数不足が `64` です。
