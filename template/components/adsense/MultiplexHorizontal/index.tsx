'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  googleAdsensePublisherId: string;
};

export default function MultiplexHorizontal(props: Props) {
  const pathname = usePathname();

  return <MultiplexHorizontalImpl key={pathname} {...props} />;
}

function MultiplexHorizontalImpl({ googleAdsensePublisherId }: Props) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle ?? []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle block text-center"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client={`ca-${googleAdsensePublisherId}`}
      // TODO: avoid hard-code
      data-ad-slot="2973504509"
    />
  );
}
