# Task YAML 作成ガイド

`ops/tasks/` に Task YAML を置きます。最低限 `header`、`objective`、`scope`、`acceptance` を記載します。

```yaml
header:
  canonical: "Task の表題"
  project:
    identifier: HNS
    prefix: HNS-
  type: Task
objective: "達成すること"
scope:
  included:
    - 実施すること
  excluded:
    - 実施しないこと
acceptance:
  - 完了と判断する条件
```

リポジトリのルートで実行します。

```sh
ops/run-cycle.sh ops/tasks/<task>.yaml
```

実行中の作業物とログは `ops/work/`、査読結果は `ops/reviews/`、進行状態は `ops/state/`、最終結果は `ops/results/` に保存されます。
