import Link from 'next/link';
import { Tag } from '@/libs/microcms';
import { TagIcon } from 'lucide-react';

type Props = {
  tag: Tag;
  hasLink?: boolean;
};

export default function TagListItem({ tag, hasLink = true }: Props) {
  if (hasLink) {
    return (
      <li className="bg-gray-100 rounded px-2 py-1 text-sm whitespace-nowrap">
        <Link href={`/tags/${tag.id}`}>
          <div className="flex gap-1 items-center">
            <TagIcon size={'1em'} alignmentBaseline={'middle'} />
            {tag.name}
          </div>
        </Link>
      </li>
    );
  }
  return (
    <li className="bg-gray-100 rounded px-2 py-1 text-sm whitespace-nowrap">
      <div className="flex gap-1 items-center">
        <TagIcon size={'1em'} />
        {tag.name}
      </div>
    </li>
  );
}
