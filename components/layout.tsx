import Head from 'next/head';
import Link from 'next/link';

import { Box, Container, Flex } from '@chakra-ui/react';
import ChakraLink from '@components/ChakraLink';

const name = 'Kohki';
export const siteTitle = "Kohki's Blog";

type Props = {
  children: any;
  home?: Boolean | undefined;
};

const Layout = ({ children, home }: Props) => {
  return (
    <Flex direction="column" minH="100vh">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Flex>
        {home ? (
          <>
            <h1>{name}</h1>
          </>
        ) : (
          <>
            <ChakraLink href="/">
              <h1>{name}</h1>
            </ChakraLink>
          </>
        )}
      </Flex>
      <Box as="main" flexGrow={1}>
        <Container>{children}</Container>
        {!home && (
          <div>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </Box>
      <Flex>footer</Flex>
    </Flex>
  );
};

export default Layout;
