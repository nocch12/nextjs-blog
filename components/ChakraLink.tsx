import NextLink from 'next/link';
import { VFC, PropsWithChildren } from 'react';
import { Link, LinkProps } from '@chakra-ui/react';

const ChakraLink: VFC<PropsWithChildren<LinkProps>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
};

export default ChakraLink;
