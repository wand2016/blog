# ブログテンプレート

microCMS 公式のシンプルなブログのテンプレートから派生して作成しました。

## 動作環境

Node.js 18 以上

## 環境変数の設定

`env.example` をコピーして `.env`ファイルを作成し、情報を埋めてください。

## 開発の仕方

1. パッケージのインストール

```bash
npm ci
```

2. 開発環境の起動

```bash
npm run dev
```

3. 開発環境へのアクセス  
   [http://localhost:3000](http://localhost:3000)にアクセス


4. ビルド

```bash
npm run build
```

5. ビルド結果に基づいて dev のインデクシング

```bash
npm run dev:indexing
```
