import { URL_PATTERN } from '$constants/string';
import { Fields, OgpData, Post } from '$types/blog';
import fs from 'fs';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import path from 'path';

// /postsディレクトリパス
const postsDirectory = path.join(process.cwd(), 'blog/posts');

// /posts配下にあるディレクトリ名(slug)をすべて取得する
export const getPostSlugs = () => {
  // まずはファイル名、ディレクトリ名を両方取得する
  const allDirents = fs.readdirSync(postsDirectory, { withFileTypes: true });
  // ディレクトリ名のみに絞り込んで返す
  return allDirents
    .filter((dirent) => dirent.isDirectory())
    .map(({ name }) => name);
};

/**
 * 与えられたslugから記事の内容を取得して返す
 * @param slug
 * @param fields 取得したい値 (slug | content | title | tags)
 */
export const getPostBySlug = async (slug: string, fields: Fields[] = []) => {
  // ファイルを読み込む
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const items: Post = {
    slug: '',
    content: '',
    discription: '',
    title: '',
    date: '',
    tags: [],
    ogpDatas: [],
  };

  // 指定された値を取得してくる
  // slugが指定されたとき、contentが指定されたとき、frontmatterの中身が指定されたときで返却の仕方が異なる
  await Promise.all(
    fields.map(async (field) => {
      if (field === 'slug') {
        items[field] = slug;
      }
      if (field === 'content') {
        items[field] = replaceAnchorLink(content);
        items['ogpDatas'] = await getOgpDatas(content);
      }

      if (['title', 'discription', 'date', 'tags'].includes(field)) {
        if (data[field]) {
          items[field] = data[field];
        }
      }
    })
  );

  return items;
};

/**
 * すべての記事から指定したfieldsの値を取得する
 * @param fields 取得したい値 (slug | content | title | tags)
 */
export const getAllPosts = async (fields: Fields[] = []) => {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug, fields))
  );

  return posts.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
};

const replaceAnchorLink = (content: string) => {
  // 単一行でURLベタ起きの個所はリンク設定
  const newContent = content.replaceAll(URL_PATTERN, '[$&]($&)');
  return newContent;
};

const getOgpDatas = async (content: string): Promise<OgpData[]> => {
  const urls = content.match(URL_PATTERN) || [];

  // 各URLごとにOGPデータ取得
  const ogpDatas = await Promise.all(
    urls.map(async (url) => {
      return await fetch(url)
        .then((res) => res.text())
        .then((text) => {
          const metaData: OgpData = {
            url,
            title: '',
            image: '',
            site_name: '',
            type: '',
            description: '',
          };
          const doms = new JSDOM(text);
          const metas = doms.window.document.getElementsByTagName('meta');

          // ogpのデータを抽出
          for (let i = 0; i < metas.length; i++) {
            const pro = metas[i].getAttribute('property') || '';
            switch (pro) {
              case 'og:title':
                metaData.title = metas[i].getAttribute('content') || '';
                break;
              case 'og:image':
                metaData.image = metas[i].getAttribute('content') || '';
                break;
              case 'og:type':
                metaData.type = metas[i].getAttribute('content') || '';
                break;
              case 'og:site_name':
                metaData.site_name = metas[i].getAttribute('content') || '';
                break;
              case 'og:description':
                metaData.description = metas[i].getAttribute('content') || '';
                break;
            }
          }

          return metaData;
        });
    })
  );

  return ogpDatas.filter((ogp) => ogp);
};
