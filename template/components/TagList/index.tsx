import { Tag } from '@/libs/microcms';
import TagListItem from '../TagListItem';
import styles from './index.module.css';

type Props = {
  tags?: Tag[];
  hasLink?: boolean;
};

export default function TagList({ tags, hasLink = true }: Props) {
  if (!tags) {
    return null;
  }
  return (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} hasLink={hasLink} />
      ))}
    </ul>
  );
}
