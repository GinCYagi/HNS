# HNS Asset Registry Admin v0.1

ローカルでGin裁定を記録し、`docs/registries/hns-asset-registry.md`を再生成するMVPです。

## 導入

このフォルダの中身をHNSリポジトリのルートへコピーしてください。

既存の `docs/registries/hns-asset-registry.md` は、念のため別名で退避してから開始してください。

## 起動

Windows PowerShellまたはコマンドプロンプトでHNSリポジトリへ移動し、次を実行します。

```powershell
node scripts/generate-registry.js
node server.js
```

ブラウザで次を開きます。

```text
http://127.0.0.1:4173
```

## 動作

- 「採用」「不採用」「保留」をクリック
- 確認ダイアログで確定
- `data/decisions.json` を更新
- 更新前JSONを `backups/` に保存
- `docs/registries/hns-asset-registry.md` を自動再生成

## 注意

- Node.js 18以上が必要です。
- サーバーは `127.0.0.1` のみに待ち受けます。
- 現状はローカル単独利用を前提とし、認証機能はありません。
- JSONが正本、Markdownは生成物です。
- 正式運用前に既存台帳との照合が必要です。


## v0.2 用語解説機能

- 画面右側に用語一覧を常時表示
- 狭い画面では「📖 用語一覧」ボタンから表示
- 状態バッジや裁定ボタンへマウスを置くと説明を表示
- 用語定義は `data/glossary.json` で一元管理
- DP／JB／CX／FP／Master／Procedureと各状態語を収録
