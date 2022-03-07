import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from 'remark'
import html from 'remark-html'

type Post = {
  id: string;
  date: string;
  [key: string]: any;
}

// postsディレクトリパス
const postsDirectory = path.join(process.cwd(), "posts");

// 記事一覧取得
export const getSortedPostsData = () => {
  // /posts配下の記事ファイル一覧を取得
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // ".md"をファイル名から削除
    const id = fileName.replace(/\.md$/, "");

    // markdownを文字列として取得
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // gray-matter でメタデータを解析
    const matterResult = matter(fileContents);

    // idと結合して記事データとして返却
    return {
      id,
      ...matterResult.data,
    } as Post;
  });
  // 取得した記事を並び替え
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}