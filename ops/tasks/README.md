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

実行生成物は `ops/work/`、`ops/reviews/`、`ops/state/`、`ops/results/`、`ops/decisions/` に保存されますが、Gitでは追跡されません。
