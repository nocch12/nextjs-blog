import Head from 'next/head';
import Link from 'next/link';

import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
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
      {/* ヘッダー */}
      <Box px={2}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {home ? (
            <>
              <Heading as="h1" color="blue.700">{name}</Heading>
            </>
          ) : (
            <>
              <ChakraLink href="/">
                <Heading as="h1" colorScheme="orange">{name}</Heading>
              </ChakraLink>
            </>
          )}
        </Flex>
      </Box>
      <Box as="main" flexGrow={1}>
        <Container maxW="container.lg">{children}</Container>
      </Box>
      {/* フッター */}
      <Box px={2} bgColor="gray.100">
        <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
          <Text as="small">&copy; 2022 Kohki Ohno. All rights reserved.</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Layout;
