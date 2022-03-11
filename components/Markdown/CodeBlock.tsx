import { PropsWithChildren } from 'react';
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

export default CodeBlock;