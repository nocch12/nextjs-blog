import { InferGetStaticPropsType, NextPage } from 'next';

import Layout from '@components/layout';
import { getAllPosts, getPostBySlug } from '@lib/posts';
import Date from '@components/date';

import { unified } from 'unified';
import remark from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

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

export const getStaticProps = async ({ params }) => {
  // path の slug から記事詳細を取得
  const post = getPostBySlug(params.slug, [
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
  return (
    <Layout>
      <article>
        <h1>{post.title}</h1>
        <div>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
};

export default Post;
