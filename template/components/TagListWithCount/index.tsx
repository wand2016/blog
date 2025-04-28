import { CSSProperties } from 'react';

import TagListItem from '@/components/TagListItem';
import { Tag } from '@/libs/microcms';

type Props = {
  tags: readonly { tag: Tag; count: number }[];
  hasLink?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function TagListWithCount({ tags, hasLink = true, className = '', style }: Props) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} style={style}>
      {tags.map(({ tag, count }) => (
        <TagListItem key={tag.id} tag={tag} count={count} hasLink={hasLink} />
      ))}
    </ul>
  );
}
