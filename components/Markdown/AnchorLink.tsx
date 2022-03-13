import { Link, LinkProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

type Props = PropsWithChildren<LinkProps & ReactMarkdownProps>;

const AnchorLink = ({ color, ...props }: Props) => {
  const { children, href } = props;

  if (
    children.length &&
    children[0] === href
  ) {

  }

  return <Link color="blue" {...props} />;
};

export default AnchorLink;
