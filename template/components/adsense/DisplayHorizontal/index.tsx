'use client';

import { usePathname } from 'next/navigation';
import AdSenseIns from '@/components/adsense/AdSenseIns';

type Props = {
  googleAdsensePublisherId: string;
};

export default function DisplayHorizontal({ googleAdsensePublisherId }: Props) {
  const pathname = usePathname();

  return (
    <AdSenseIns
      key={pathname}
      className="block"
      googleAdsensePublisherId={googleAdsensePublisherId}
      // TODO: avoid hard-code
      adSlot="4194252684"
      adFormat="auto"
      fullWidthResponsive={true}
    />
  );
}
