import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Layout from '$components/Layout';
import { getAllPosts, getPostBySlug } from '$lib/blog';

import { ParsedUrlQuery } from 'querystring';
import { Box, Heading, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Markdown from '$components/Markdown/Markdown';
import Head from 'next/head';
import { dateFormat } from '$lib/date';
import { getTitle } from '$lib/site';
import MarkdownIndex from '$components/Markdown/MarkdownIndex';
import { Post } from '$types/blog';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = await getAllPosts(['slug']);
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
  const post = await getPostBySlug(slug, [
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

const PostPage: NextPage<Props> = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{getTitle(post.title)}</title>
      </Head>
      <Box as="article" className="markdown-body">
        <Box mb={16}>
          {/* 記事タイトル */}
          <Text color="gray">{dateFormat(post.date)}</Text>
          <Heading fontSize="4xl" as="h2" my={4}>
            {post.title}
          </Heading>
          {/* タグ */}
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
        {/* 見出し */}
        <MarkdownIndex markdown={post.content} />
        {/* 本文 */}
        <Markdown ogpDatas={post.ogpDatas} markdown={post.content} />
      </Box>
    </Layout>
  );
};

export default PostPage;
