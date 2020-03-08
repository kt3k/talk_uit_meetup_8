class: middle, center
<img src="./assets/deno_logo_3.svg" align="center" width="300" />

# Deno の話
---
自己紹介
# Deno澤

- twitter.com/kt3k
- github.com/kt3k
- フリーランス・Web エンジニア

<img src="./assets/hino-izu.jpg" align="center" width="200" />

---
# Deno澤

Deno のコアコントリビュータ

- Deno で作った機能
  - Signal Handler
  - Benchmark システム
  - deno fmt (初期版)
  - これまで約100 PR コントリビュート

---
class: middle, center

# 🦕 Deno を聞いたことある人 🙋‍♀️ 🙋‍♂️
---
# Deno とは

- TypeScript を直接実行できる JS エンジン
- Node.js ととても似ている (作者が同じ)

---
# Deno と ts-node

- ts-node も .ts ファイルを直接実行できる.
- 一見似ているように見える.

---
# ts-node の依存解決
- ts-node で 3rd party ライブラリに依存したプログラムを実行する場合, 事前に依存モジュールのダウンロードが必要.

```
npm install react @types/react ...
```

---
# Deno の依存解決
- Deno は実質 Node + npm
  - 依存の解決が単体で出来る
- 3rd party 依存したプログラムを実行すると必要なものを自動的に DL & Compile & 実行してくれる
  - => 余計なインストール作業が一切不要

```
import * as React from "https://dev.jspm.io/react";
// => 実行時に自動ダウンロード
```

---
class: middle, center, inverse
# Demo

```
deno demo.ts
```
---
class: middle, center
# ライブラリの作り方

---
class: middle, center
# TypeScript で再利用可能なライブラリを書く場合

---
# Node の場合

- npm に TS を上げることは出来ないため, 一旦全て JS にする必要がある
- なおかつ型補完を効かせるために .d.ts ファイルを用意する必要もある
  - => 結構面倒

---
# Deno の場合

- TS を書く. 以上.
  - => 考える事が極端に少ない.

---
# Deno の場合

- テストも TS でそのまま書く.
- テストコマンドは `deno test`
- TS の世界で全て出来るので, JS の世界のことを忘れても良い.

---
class: center, middle
おまけ

# パーミッションフラグの話

(TS とは直接関係ない話)
---
# パーミッションフラグ
- Deno の目玉機能! パーミッションフラグ
- 実行時にプログラムがやって良いことを指定する

例: ネットワークアクセスを許可するパーミッション
```
deno --allow-net script.ts
```

---
# パーミッションフラグ

- 現在8種類のパーミッションフラグがある
  - --allow-read
  - --allow-write
  - --allow-net
  - --allow-env
  - --allow-hrtime
  - --allow-plugin
  - --allow-run
  - --allow-all

---
# パーミッションフラグ
- --allow-read
  - ファイル読み込み許可
- --allow-write
  - ファイル書き込み許可
- --allow-net
  - ネットアクセス許可
- --allow-env
  - 環境変数アクセス許可
- --allow-all
  - 全部許可 ☠️
---
# パーミッションフラグ

- フラグを組み合わせて, そのプログラムが本来必要とする機能だけを許可してプログラムを実行する
- 例: リンター

  ```
  deno --allow-read linter.ts
  ```

---
class: middle, center, inverse
# DEMO

```
deno demo.ts
```
---
# まとめ

- Deno は Node + ts-node + npm みたいなやつ
- Deno を使うと TypeScript の世界だけで全部できるようになる
- Deno はセキュリティ機能が強い

---
class: middle, center, inverse
ご静聴ありがとうございました!
