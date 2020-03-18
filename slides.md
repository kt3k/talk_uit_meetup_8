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
class: middle, center, inverse

(本セッションは, Frontend 成分が少なめ,<br/>TypeScript 成分が多め, Deno 成分が多めです.<br/>ご了承ください.)

---
# Deno とは

- TypeScript を直接実行できる JS エンジン
- Node.js ととても似ている (作者が同じ)

<p align="center">
  <img src="./assets/ry.png" width="480" />
</p>

---
# Deno とは

- Deno は Node とは互換性がない.
- npm も使えない. Deno 独自のエコシステムを使う.

---
# ts-node と Deno

- ts-node も .ts ファイルを直接実行できる.
- 一見似ているように見える.
- ts-node は Node 互換で npm が使える.

<p align="center">
  <img src="./assets/ts-node.svg" width="580" />
</p>

---
# ts-node の依存解決
- ts-node で 3rd party ライブラリに依存したプログラムを実行する場合, 事前に依存モジュールのダウンロードが必要.

```
npm install minimist @types/minimist ...
```
してから
```
npx ts-node main.ts
```

---
# Deno の依存解決
- Deno は実質 Node + npm
  - 依存の解決も Deno がやってくれる
  - インストール作業が不要

```
import { parse } from "https://deno.land/std/flags/mod.ts";
// ↑ 実行時, 自動的にダウンロード
```

上のスクリプトを直接

```
deno main.ts
```

---
class: middle, center, inverse
# Demo

```
deno demo.ts
```

???

demo-flag.ts と demo-serve.ts を DL and compile と再実行

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
# Node の場合

- さらにバンドルをしたい場合はより難易度が上がる.
- rollup? webpack? plugin どれ使う? などの選択肢が多く, メンテされていないもの(地雷)も多い.

---
# Deno の場合

- TypeScript を書く. 以上.
  - トランスパイルや, .d.ts 配布を考える必要がない.
  - => 考えることが極端に少ない ❤️

---
# Deno の場合

- テストも TS でそのまま書く.
- TS の世界で全て出来るので, JS の世界のことを忘れても良い.

```
Deno.test("期待動作", () => {
  // テストコード
});
```

```
deno test
```

---
class: middle, center, inverse

# Demo

`deno test demo.ts`

---
# Deno のエディタサポート

- 最近良いエディタプラグインが出来た
- axetroy さんの vscode-deno
- 補完もバッチリ効くようになった

---
# Deno のエディタサポート
- Deno 名前空間

---
# Deno のエディタサポート
- URL import も補完されます.


---
class: center, middle

# パーミッションフラグの話

(TS とは直接は関係ないですが)
---
# パーミッションフラグ
- Deno の目玉機能!
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

- ↑リンターはファイルの読み込みだけで十分のはず
- これで権限エラーが起きたら何かが怪しい
---
# パーミッションフラグ

- ちなみにフラグを何もつけない場合は, 読み書きネットワークアクセスなどは全く出来ない状態で実行されます.
  - => 信用が出来ないスクリプトは一旦フラグ無しで実行すれば安全に様子を見ることが出来る.

---
# パーミッションフラグ

- 言語の API レベルでパーミッションという概念を実装した言語は (多分) Deno が初めて
- プログラムの実行を限られた権限の中で行うことが出来るのは, 全ての (メジャーな) 言語の中で Deno だけ (たぶん)

---
class: middle, center, inverse
# DEMO

```
deno demo.ts
```

---
# 宣伝

- パーミンションフララグの組み合わせ方のベストプラクティスについて Denobook 03 に書きました

<p align="center">
  <a href="https://techbookfest.org/product/6283486381998080" target="_blank">
    <img src="./assets/denobook03.png" width="200" />
  </a>
</p>

---
class: middle, center
# Deno とフロントエンド開発

---
# Deno とフロントエンド開発

- `deno bundle` というコマンドで webpack みたいなことが出来る.
- が, デフォルトでは dom の型が入っていないのでフロント開発が出来ない.
- react や vue の型を正しく読み込む方法も不安定
  - => フロント開発はまだ無理 😣

---
# Deno とフロントエンド開発

- Deno の中の TypeScript コンパイラー API が最近充実してきている.
- これを webpack / parcel のようなものを作るための部品として使えそう.
- 1年後ぐらいにはなんか出来てそうな気がします.

---
# Deno とフロントエンド開発
- 出来たら起こすので,<br />とりあえず寝て待ってて下さい.

<p align="center">
  <img src="./assets/aramaki.png" width="400" />
</p>

---
class: inverse
# まとめ

- Deno は Node + ts-node + npm みたいなやつ
- Deno はライブラリ開発の DX がとても高い
- Deno はセキュリティ機能がとても強い
- Deno でフロントエンドはまだ無理なのでちょっと待ってて下さい

---
class: middle, center
ご清聴ありがとうございました! 🙇‍♂️
