'use client';

import { usePathname } from 'next/navigation';
import AdSenseIns from '@/components/adsense/AdSenseIns';

type Props = {
  googleAdsensePublisherId: string;
};

export default function MultiplexHorizontal({ googleAdsensePublisherId }: Props) {
  const pathname = usePathname();

  return (
    <AdSenseIns
      key={pathname}
      className="block"
      googleAdsensePublisherId={googleAdsensePublisherId}
      // TODO: avoid hard-code
      adSlot="8578891267"
      adFormat="autorelaxed"
    />
  );
}
