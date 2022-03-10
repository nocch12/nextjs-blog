import { Text } from '@chakra-ui/react';
import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
}

const Date = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return <Text>{format(date, "yyyy.LL.dd")}</Text>;
}

export default Date;
