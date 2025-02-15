'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  googleAdsensePublisherId: string;
};

export default function InArticle(props: Props) {
  const pathname = usePathname();

  return <InArticleImpl key={pathname} {...props} />;
}

function InArticleImpl({ googleAdsensePublisherId }: Props) {
  useLayoutEffect(() => {
    (window.adsbygoogle = window.adsbygoogle ?? []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-format="autorelaxed"
      data-ad-client={`ca-${googleAdsensePublisherId}`}
      // TODO: avoid hard-code
      data-ad-slot="8578891267"
    />
  );
}
