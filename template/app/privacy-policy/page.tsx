import { Metadata, ResolvingMetadata } from 'next';

import ArticleContent from '@/components/ArticleContent';
import ArticleTitle from '@/components/ArticleTitle';
import { SITE_NAME } from '@/libs/siteMetadata';

export const generateMetadata = async (
  _: object,
  parent: ResolvingMetadata,
): Promise<Metadata> => ({
  title: 'プライバシーポリシー',
  description: 'プライバシーポリシー・免責事項です。',
  // @ts-expect-error 型が合わない
  openGraph: {
    ...(await parent).openGraph,
    title: 'プライバシーポリシー',
    description: 'プライバシーポリシー・免責事項です。',
  },
  alternates: {
    canonical: '/privacy-policy/',
  },
});

export default function Page() {
  return (
    <article data-pagefind-body className="w-full max-w-[720px] mx-auto">
      <ArticleTitle className="mb-4">プライバシーポリシー</ArticleTitle>
      <ArticleContent>
        <h2>個人情報の利用目的</h2>
        当ブログでは、お問い合わせの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
        取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
        <h2>広告について</h2>
        <p>
          当ブログでは、第三者配信の広告サービス（Googleアドセンス）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
          クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。
          Cookieを無効にする方法やGoogleアドセンスに関する詳細は
          <a href="https://policies.google.com/technologies/ads?gl=jp" target="_blank">
            「広告 – ポリシーと規約 – Google」
          </a>
          をご確認ください。
        </p>
        <p>
          また、 {SITE_NAME}
          は、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
        </p>
        <h2>アクセス解析ツールについて</h2>
        当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
        <h2>免責事項</h2>
        当ブログからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
        また当ブログのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
        当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        <h2>著作権について</h2>
        当ブログで掲載している文章や画像などにつきましては、無断転載することを禁止します。
        <h2>リンクについて</h2>
        当ブログは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
        ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
      </ArticleContent>
    </article>
  );
}
