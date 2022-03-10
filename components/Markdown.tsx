import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type CodeBlockProps = PropsWithChildren<{
  inline?: boolean;
  className?: string;
}>;

const CodeBlock = ({
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  // 言語を抜き出す
  const match = /language-(\w+)/.exec(className || '');
  // ハイライトさせたコードブロック
  const lang = match ? match[1] : '';
  return !inline ? (
    <SyntaxHighlighter style={dracula} language={lang} PreTag="div" {...props}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    // インラインコードはそのまま出力
    <code className={className} {...props}>
      {children}
    </code>
  );
};

type Props = {
  markdown: string;
};

const Markdown = ({ markdown }: Props) => {
  return (
    // html化されたマークダウンのスタイリング
    <Box
      sx={{
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
      }}
    >
      <ReactMarkdown children={markdown} components={{ code: CodeBlock }} />
    </Box>
  );
};

export default Markdown;
