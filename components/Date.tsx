import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
}

const Date = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return format(date, "yyyy.LL.dd");
}

export default Date;
