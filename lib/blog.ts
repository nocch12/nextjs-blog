import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Post = {
  slug: string;
  content: string;
  discription: string;
  title: string;
  date: string;
  tags: string[];
};

export type Fields = 'slug' | 'title' | 'content' | 'date' | 'tags' | 'discription';

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
export const getPostBySlug = (slug: string, fields: Fields[] = []) => {
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
  };

  // 指定された値を取得してくる
  // slugが指定されたとき、contentが指定されたとき、frontmatterの中身が指定されたときで返却の仕方が異なる
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (['title', 'discription', 'date', 'tags'].includes(field)) {
      if (data[field]) {
        items[field] = data[field];
      }
    }
  });
  console.log(items);
  
  
  return items;
};

/**
 * すべての記事から指定したfieldsの値を取得する
 * @param fields 取得したい値 (slug | content | title | tags)
 */
export const getAllPosts = (fields: Fields[] = []) => {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    });

  return posts;
};
