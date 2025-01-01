import { Tag } from '@/libs/microcms';
import TagList from '@/components/TagList';
import styles from './index.module.css';

type Props = {
  tags: Tag[];
};

export default function Nav({ tags }: Props) {
  return (
    <nav className={styles.nav}>
      {/*TODO PageFind で SearchField 再実装*/}
      {/*<SearchField />*/}
      <TagList tags={tags} />
    </nav>
  );
}
