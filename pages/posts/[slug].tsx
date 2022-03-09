import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Layout from '@components/layout';
import { getAllPosts, getPostBySlug, Post } from '@lib/posts';
import Date from '@components/date';

import { unified } from 'unified';
import remark from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import { ParsedUrlQuery } from 'querystring';
import { Box, Text } from '@chakra-ui/react';
import prism from 'prismjs';
import { useEffect } from 'react';


import "prismjs/themes/prism-tomorrow.css"

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

  // markdown を html に変換
  const processedContent = await unified()
    .use(remark)
    .use(remark2rehype)
    .use(html)
    .use(rehypeHighlight)
    .process(post.content);
  const content = processedContent.toString();

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

const Post: NextPage<Props> = ({ post }) => {
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <Layout>
      <Box as="article" className="markdown-body">
        <Text fontSize="xl" as="h2">
          {post.title}
        </Text>
        <Box borderLeft={2}>a</Box>
        <div>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </Box>
    </Layout>
  );
};

export default Post;
