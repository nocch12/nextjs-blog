import { format, parseISO } from 'date-fns';

export const dateFormat = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "yyyy.LL.dd");
}