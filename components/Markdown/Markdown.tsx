import { OgpData } from '$types/blog';
import {
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import AnchorLink from './AnchorLink';
import Blockquote from './Blockquote';
import CodeBlock from './CodeBlock';
import { H2, H3, H4, H5, H6 } from './Headings';

type Props = {
  markdown: string;
  ogpDatas: OgpData[];
};

const getOgp = (list: OgpData[], href?: string) => {
  return list.find(l => l.url === href);
}

// マークダウンをparseしてスタイリング
const Markdown = ({ markdown, ogpDatas }: Props) => {
  return (
    // 見出し6は使わない
    <ReactMarkdown
      children={markdown}
      components={{
        h1: H2,
        h2: H3,
        h3: H4,
        h4: H5,
        h5: H6,
        p: (props) => <Text my={4} {...props} />,
        a: (props) => <AnchorLink ogpData={getOgp(ogpDatas, props.href)} {...props} />,
        ul: ({ ordered, ...props }) => <UnorderedList {...props} />,
        ol: ({ ordered, ...props }) => <OrderedList {...props} />,
        code: CodeBlock,
        blockquote: Blockquote,
      }}
    />
  );
};

export default Markdown;
