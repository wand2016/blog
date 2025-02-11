import { Tag } from '@/libs/microcms';
import TagListItem from '../TagListItem';

type Props = {
  tags?: Tag[];
  hasLink?: boolean;
};

export default function TagList({ tags, hasLink = true }: Props) {
  if (!tags) {
    return null;
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} hasLink={hasLink} />
      ))}
    </ul>
  );
}
