import NextLink from 'next/link';
import { VFC, PropsWithChildren } from 'react';
import { Link, LinkProps } from '@chakra-ui/react';
import { UrlObject } from 'url';

type Props = LinkProps |  {
  href: UrlObject;
}


const ChakraLink: VFC<PropsWithChildren<Props>> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href || ''} passHref>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
};

export default ChakraLink;
