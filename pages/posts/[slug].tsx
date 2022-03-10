import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Layout from '@components/layout';
import { getAllPosts, getPostBySlug, Post } from '@lib/posts';
import Date from '@components/date';

import { ParsedUrlQuery } from 'querystring';
import { Box, Heading, Text } from '@chakra-ui/react';
import Markdown from '@components/Markdown';

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
      <Box as="article" className="markdown-body">
        <Heading fontSize="4xl" as="h2">
          {post.title}
        </Heading>
        <div>
          <Date dateString={post.date} />
        </div>
        <Markdown markdown={post.content} />
      </Box>
    </Layout>
  );
};

export default Post;
