import { Suspense } from 'react';

type Props = {
  draft: React.ReactNode;
};

export default function DraftLayout({ draft }: Props) {
  return `${process.env.USE_DRAFT ?? ''}` === 'true' ? (
    <Suspense fallback={null}>{draft}</Suspense>
  ) : null;
}
