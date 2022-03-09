import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: `'M PLUS 1p', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    body: `'M PLUS 1p', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  styles: {
    global: {
      '.markdown-body': {
        // テキスト
        h1: { fontSize: '3xl', fontWeight: 'bold', my: 4 },
        h2: { fontSize: '3xl', fontWeight: 'bold', my: 4 },
        h3: { fontSize: '2xl', fontWeight: 'bold', my: 4 },
        h4: { fontSize: 'xl', fontWeight: 'bold', my: 4 },
        h5: { fontSize: 'lg', fontWeight: 'bold', my: 4 },
        h6: { fontWeight: 'bold', my: 4 },
        p: { my: 4 },
        // リスト
        'ul, ol': {
          pl: 6,
          mt: 2,
          li: {
            '&:not(:first-child)': {
              mt: 2,
            },
          },
        },
        // リンク
        a: {
          color: 'blue',
          _hover: {
            textDecoration: 'underline',
          },
        },
        // 引用符
        blockquote: {
          pl: 4,
          position: 'relative',
          _before: {
            content: `""`,
            position: 'absolute',
            height: '100%',
            ml: -4,
            borderLeftStyle: 'solid',
            borderLeftWidth: 4,
          },
        },
      },
    },
  },
});
