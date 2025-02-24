'use client';

import { useLayoutEffect } from 'react';

type Props = {
  className?: string;
  googleAdsensePublisherId: string;
  adSlot: string;
  adLayout?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
};

export default function AdSenseIns({
  className = '',
  googleAdsensePublisherId,
  adSlot,
  adFormat,
  adLayout,
  fullWidthResponsive,
}: Props) {
  useLayoutEffect(() => {
    (window.adsbygoogle = window.adsbygoogle ?? []).push({});
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      data-ad-client={`ca-${googleAdsensePublisherId}`}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-ad-layout={adLayout}
      data-full-width-responsive={`${fullWidthResponsive}`}
    />
  );
}
