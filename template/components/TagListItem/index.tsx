import Link from 'next/link';
import { Tag } from '@/libs/microcms';
import styles from './index.module.css';

type Props = {
  tag: Tag;
  hasLink?: boolean;
};

export default function TagListItem({ tag, hasLink = true }: Props) {
  if (hasLink) {
    return (
      <li className={styles.tag}>
        <Link href={`/tags/${tag.id}`}>#{tag.name}</Link>
      </li>
    );
  }
  return <li className={styles.tag}>#{tag.name}</li>;
}
