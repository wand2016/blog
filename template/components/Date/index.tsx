import { Calendar, RefreshCw } from 'lucide-react';

import { formatDate } from '@/libs/formatDate';

type Props = {
  date: string;
  updatedDate: string;
  className?: string;
};

export default function PublishedDate({ date, updatedDate, className = '' }: Props) {
  const formattedDate = formatDate(date);
  const formattedUpdatedDate = !!updatedDate ? formatDate(updatedDate) : null;

  return (
    <span className={`flex gap-4 ${className}`}>
      <span className="flex items-center gap-2">
        <Calendar width={16} height={16} />
        {formattedDate}
      </span>
      {!!formattedUpdatedDate && formattedDate !== formattedUpdatedDate && (
        <span className="flex items-center gap-2">
          <RefreshCw width={16} height={16} />
          {formattedUpdatedDate}
        </span>
      )}
    </span>
  );
}
