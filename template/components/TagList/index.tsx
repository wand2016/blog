import { CSSProperties } from 'react';

import TagListItem from '@/components/TagListItem';
import { Tag } from '@/libs/microcms';

type Props = {
  tags: readonly Tag[];
  hasLink?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function TagList({ tags, hasLink = true, className = '', style }: Props) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} style={style}>
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} hasLink={hasLink} />
      ))}
    </ul>
  );
}
