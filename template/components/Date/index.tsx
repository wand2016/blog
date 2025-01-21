import styles from './index.module.css';
import { Calendar, RefreshCw } from 'lucide-react';
import { formatDate } from '@/libs/formatDate';

type Props = {
  date: string;
  updatedDate: string;
};

export default function PublishedDate({ date, updatedDate }: Props) {
  const formattedDate = formatDate(date);
  const formattedUpdatedDate = !!updatedDate ? formatDate(updatedDate) : null;

  return (
    <span className={styles.dates}>
      <span className={styles.date}>
        <Calendar width={16} height={16} />
        {formattedDate}
      </span>
      {!!formattedUpdatedDate && formattedDate !== formattedUpdatedDate && (
        <span className={styles.date}>
          <RefreshCw width={16} height={16} />
          {formattedUpdatedDate}
        </span>
      )}
    </span>
  );
}
