'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import InArticle from '@/components/adsense/InArticle';

type Props = {
  googleAdsensePublisherId: string;
};

/**
 * 記事に広告をポータルで埋め込むコンポーネント
 */
export default function InArticleAdsPortal(props: Props) {
  const pathname = usePathname();

  return <InArticleAdsPortalImpl key={pathname} {...props} />;
}

function InArticleAdsPortalImpl({ googleAdsensePublisherId }: Props) {
  const [adPortals, setAdPortals] = useState<Element[]>([]);

  useEffect(() => {
    setAdPortals(Array.from(document.querySelectorAll('.ad-portal')));
  }, []);

  return (
    <>
      {adPortals.map((adPortal, index) =>
        createPortal(
          <InArticle googleAdsensePublisherId={googleAdsensePublisherId} />,
          adPortal,
          `ad-portal-${index}`,
        ),
      )}
    </>
  );
}
