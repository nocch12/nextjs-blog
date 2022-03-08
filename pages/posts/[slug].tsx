import { InferGetStaticPropsType, NextPage } from 'next';

import Layout from '@components/layout';
import { getAllPosts, getPostBySlug } from '@lib/posts';
import Date from '@components/date';

import utilStyles from '@styles/utils.module.css';
import remark from 'remark';
import html from 'remark-html';

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
  const processedContent = await remark().use(html).process(post.content);
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
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
};

export default Post;
