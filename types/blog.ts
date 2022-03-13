export type Fields =
  | 'slug'
  | 'title'
  | 'content'
  | 'date'
  | 'tags'
  | 'discription';

export type OgpData = {
  url: string;
  title?: string;
  image?: string;
  site_name?: string;
  type?: string;
  description?: string;
};

export type Post = {
  slug: string;
  content: string;
  ogpDatas: OgpData[];
  discription: string;
  title: string;
  date: string;
  tags: string[];
};
