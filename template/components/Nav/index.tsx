import { Tag } from '@/libs/microcms';
import SearchField from '@/components/SearchField';
import TagList from '@/components/TagList';
import styles from './index.module.css';

type Props = {
  className?: string;
  tags: Tag[];
};

export default function Nav({ className, tags }: Props) {
  return (
    <nav className={className ? [className, styles.nav].join(' ') : styles.nav}>
      <SearchField />
      <TagList tags={tags} />
    </nav>
  );
}
