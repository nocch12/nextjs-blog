import { SITE_TITLE } from '@constants/site';

export const getTitle = (title?: string) => {
  return title ? `${title}|${SITE_TITLE}` : SITE_TITLE;
};
