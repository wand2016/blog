import { formatDate } from '@/libs/utils';
import styles from './index.module.css';
import { Clock } from 'lucide-react';

type Props = {
  date: string;
};

export default function PublishedDate({ date }: Props) {
  return (
    <span className={styles.date}>
      <Clock width={16} height={16} />
      {formatDate(date)}
    </span>
  );
}
