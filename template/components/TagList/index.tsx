import { Tag } from '@/libs/microcms';
import TagListItem from '../TagListItem';

type Props = {
  tags: Tag[];
  hasLink?: boolean;
  className?: string;
};

export default function TagList({ tags, hasLink = true, className = '' }: Props) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} hasLink={hasLink} />
      ))}
    </ul>
  );
}
