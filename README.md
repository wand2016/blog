# ブログ

microCMS + Next.js (SSG) のブログシステムです。

## プロジェクト構成

### ./template/

ブログテンプレート (フロントエンド) です。

microCMS 製の [nextjs-simple-blog-template](https://github.com/microcmsio/nextjs-simple-blog-template) を改変して利用しています。

### ./infra/

AWS にデプロイするためのインフラ一式です。

## 開発ツールインストール

asdf でインストールします。

```shell
cut -d' ' -f1 .tool-versions | xargs -I{} asdf plugin add {}

asdf install
```
