# ブログテンプレート

microCMS 製の [nextjs-simple-blog-template](https://github.com/microcmsio/nextjs-simple-blog-template) を改変して利用しています。

## 環境変数の設定

`env.example` をコピーして `.env`ファイルを作成し、情報を埋めてください。

## 開発の仕方

1. パッケージのインストール

```bash
pnpm i
```

2. ビルド

```bash
pnpm build
```

> [!WARNING]
> microCMS 側で「ブログ」「タグ」を1つ以上作成しないとビルドが失敗します。

3. ビルド結果のプレビュー
 
```bash
pnpm preview
```

> [!TIP]
> SSG では next start を使えないので http-server を動かしています。

3. ビルド結果に基づいて dev のインデクシング

サイト内検索を [Pagefind](https://pagefind.app/) で実現しています。
Pagefind のインデクシングを行うためにビルドが必要です。

```bash
pnpm dev:indexing
```

4. 開発環境の起動

```bash
pnpm dev
```

> [!WARNING]
> microCMS 側で「ブログ」「タグ」を1つ以上作成しないとビルドが失敗します。

[http://localhost:3000](http://localhost:3000) にアクセス

