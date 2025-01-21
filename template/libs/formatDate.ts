import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

export const formatDate = (date: string) => {
  const utcDate = new Date(date);
  const jstDate = utcToZonedTime(utcDate, 'Asia/Tokyo');
  return format(jstDate, 'yyyy-MM-dd');
};
