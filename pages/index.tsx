import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import { getAllPosts } from "@lib/blog";
import { InferGetStaticPropsType, NextPage } from 'next';
import { SITE_TITLE } from '@constants/site';
import { dateFormat } from '@lib/date';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
  const allPostsData = getAllPosts(['slug', 'title', 'date']);
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
        <title>{SITE_TITLE}</title>
      </Head>

      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2>Blog</h2>
        <ul>
          {allPostsData.map(({ slug, date, title }) => (
            <li key={slug}>
              <Link href={`/blog/posts/${slug}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                {dateFormat(date)}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export default Home;