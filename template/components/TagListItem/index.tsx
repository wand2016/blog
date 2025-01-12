import Link from 'next/link';
import { Tag } from '@/libs/microcms';
import styles from './index.module.css';
import { TagIcon } from 'lucide-react';

type Props = {
  tag: Tag;
  hasLink?: boolean;
};

export default function TagListItem({ tag, hasLink = true }: Props) {
  if (hasLink) {
    return (
      <li className={styles.tag}>
        <Link href={`/tags/${tag.id}`}>
          <div className={styles.tagInner}>
            <TagIcon size={'1em'} alignmentBaseline={'middle'} />
            {tag.name}
          </div>
        </Link>
      </li>
    );
  }
  return (
    <li className={styles.tag}>
      <div className={styles.tagInner}>
        <TagIcon size={'1em'} />
        {tag.name}
      </div>
    </li>
  );
}
