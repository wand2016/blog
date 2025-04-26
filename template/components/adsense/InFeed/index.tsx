'use client';

import { usePathname } from 'next/navigation';

import AdSenseIns from '@/components/adsense/AdSenseIns';

type Props = {
  googleAdsensePublisherId: string;
  adSlot: string;
};

export default function InFeed({ googleAdsensePublisherId, adSlot }: Props) {
  const pathname = usePathname();

  return (
    <AdSenseIns
      key={pathname}
      className="block"
      googleAdsensePublisherId={googleAdsensePublisherId}
      adSlot={adSlot}
      adFormat="fluid"
      adLayoutKey="-68+co-l-79+n1"
    />
  );
}
