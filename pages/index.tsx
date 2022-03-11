import Head from "next/head";
import Layout from "@components/Layout";
import { getAllPosts } from "@lib/blog";
import { InferGetStaticPropsType, NextPage } from 'next';
import PostItem from '@components/PostItem';
import { Box, Heading, Stack } from '@chakra-ui/react';
import { getTitle } from '@lib/site';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
  const allPostsData = getAllPosts(['slug', 'title', 'discription', 'date']);
  return {
    props: {
      allPostsData,
    },
  };
}

const Home: NextPage<Props> = ({ allPostsData }) => {
  return (
    <Layout home>
      <Head>
        <title>{getTitle()}</title>
      </Head>

      <Box as="section">
        <Heading as="h2" size="lg" mb={6}>記事一覧</Heading>
        {/* 記事一覧 */}
        <Stack spacing={2}>
          {allPostsData.map((post) => (
            <PostItem {...post} key={post.slug} />
          ))}
        </Stack>
      </Box>
    </Layout>
  );
}

export default Home;