'use client';

import { usePathname } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import DisplayHorizontal from '@/components/adsense/DisplayHorizontal';

type Props = {
  googleAdsensePublisherId: string;
  adSlot: string;
};

/**
 * 記事に広告をポータルで埋め込むコンポーネント
 */
export default function InArticleAdsPortal(props: Props) {
  const pathname = usePathname();

  return <InArticleAdsPortalImpl key={pathname} {...props} />;
}

function InArticleAdsPortalImpl({ googleAdsensePublisherId, adSlot }: Props) {
  const [adPortals, setAdPortals] = useState<Element[]>([]);

  useLayoutEffect(() => {
    setAdPortals(Array.from(document.querySelectorAll('.ad-portal')));
  }, []);

  return (
    <>
      {adPortals.map((adPortal, index) =>
        createPortal(
          <DisplayHorizontal googleAdsensePublisherId={googleAdsensePublisherId} adSlot={adSlot} />,
          adPortal,
          `ad-portal-${index}`,
        ),
      )}
    </>
  );
}
