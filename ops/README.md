# HNS Role Runner PoC

`HNS-Crd-local` がYAML Taskを読み、実装、テスト、査読、minor差戻しを最大3往復まで実行するローカル用PoCです。正典変更、Decision、受入テスト変更、moderate以上の指摘、競合する推奨を検出すると停止し、Ginへ裁定を返します。pushとmergeは行いません。

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

## 保存物

- `work/<run-id>/task.yaml`: 入力Taskの不変コピー
- `work/<run-id>/round-NN.request.yaml`: 実装Runtimeへの入力
- `work/<run-id>/round-NN.yaml`: 実装RuntimeのYAML応答
- `work/<run-id>/round-NN.test.yaml`: テスト結果
- `work/<run-id>/*.log`: Runtime・テスト・Runnerの標準出力、標準エラー、進行ログ
- `reviews/<run-id>/round-NN.request.yaml`: 査読Runtimeへの入力
- `reviews/<run-id>/round-NN.yaml`: 査読RuntimeのYAML応答
- `state/<run-id>.yaml`: 最後に確定保存された状態
- `results/<run-id>.yaml`: 終了Receipt
- `decisions/<run-id>-gin-request.yaml`: 裁定停止時のGin向けDecisionRequest（Decisionそのものではない）

Runtime異常や不正YAMLを含む失敗でも、Taskコピー、取得済み出力、ログ、状態、Receiptを残します。終了コードは正常完了が `0`、裁定待ち・上限到達・失敗が `2`、引数不足が `64` です。
