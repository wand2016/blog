'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';

type Props = {
  googleAdsensePublisherId: string;
};

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
        createPortal(<div>ad ins!!!</div>, adPortal, `ad-portal-${index}`),
      )}
    </>
  );
}
