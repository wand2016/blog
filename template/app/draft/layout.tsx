import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

type Props = {
  draft: React.ReactNode;
};

export default function DraftLayout({ draft }: Props) {
  return `${process.env.USE_DRAFT ?? ''}` === 'true' ? (
    <Suspense fallback={null}>{draft}</Suspense>
  ) : null;
}
