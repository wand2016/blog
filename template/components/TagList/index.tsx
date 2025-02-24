import { Tag } from '@/libs/microcms';
import TagListItem from '../TagListItem';
import { CSSProperties } from 'react';

type Props = {
  tags: Tag[];
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
