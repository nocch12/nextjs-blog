import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Layout from '@components/Layout';
import { getAllPosts, getPostBySlug, Post } from '@lib/blog';

import { ParsedUrlQuery } from 'querystring';
import { Box, Heading, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Markdown from '@components/Markdown/Markdown';
import Head from 'next/head';
import { dateFormat } from '@lib/date';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async (
  context
) => {
  // path の slug から記事詳細を取得
  const { slug } = context.params as IParams;
  const post = getPostBySlug(slug, [
    'title',
    'content',
    'date',
    'slug',
    'tags',
  ]);

  return {
    props: {
      post,
    },
  };
};

const Post: NextPage<Props> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>aaa</title>
      </Head>
      <Box as="article" className="markdown-body">
        <Box mb={16}>
          <Text color="gray">{dateFormat(post.date)}</Text>
          <Heading fontSize="4xl" as="h2" my={4}>
            {post.title}
          </Heading>
          <Wrap spacing={2}>
            {post.tags.map((tag) => (
              <WrapItem key={tag}>
                <Tag colorScheme="orange" variant="outline">
                  #{tag}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <Markdown markdown={post.content} />
      </Box>
    </Layout>
  );
};

export default Post;
