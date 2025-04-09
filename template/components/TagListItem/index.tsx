import Link from 'next/link';
import { Tag } from '@/libs/microcms';
import { TagIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';

type Props = {
  tag: Tag;
  hasLink?: boolean;
};

export default function TagListItem({ tag, hasLink = true }: Props) {
  return (
    <li className="inline-block">
      <Container
        className="bg-gray-100 rounded px-2 py-1 text-sm whitespace-nowrap inline-block"
        href={hasLink ? `/tags/${tag.id}` : undefined}
      >
        <div className="flex gap-1 items-center">
          <TagIcon size={'1em'} alignmentBaseline={'middle'} />
          {tag.name}
        </div>
      </Container>
    </li>
  );
}

const Container = ({
  className = '',
  href,
  children,
}: PropsWithChildren<{ className?: string; href?: string }>) => {
  return href ? (
    <Link href={href} className={`${className} active:ring-2 hover:bg-gray-200`}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
};
