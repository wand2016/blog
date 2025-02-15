'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  googleAdsensePublisherId: string;
};

export default function DisplayHorizontal(props: Props) {
  const pathname = usePathname();

  return <DisplayHorizontalImpl key={pathname} {...props} />;
}

function DisplayHorizontalImpl({ googleAdsensePublisherId }: Props) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle ?? []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      data-ad-client={`ca-${googleAdsensePublisherId}`}
      // TODO: avoid hard-code
      data-ad-slot="4194252684"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
