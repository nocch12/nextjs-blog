import { PropsWithChildren } from 'react';
import {
  Box,
  Button,
  Link,
  VStack,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import { HeadingProps } from 'react-markdown/lib/ast-to-react';
import useCollapse from '$hooks/useCollape';

type Props = {
  markdown: string;
};

const ankerLink = ({
  node,
  level,
  ...props
}: PropsWithChildren<HeadingProps>) => {
  // 見出しレベルに応じてパッディング付与
  const pl = (0 + level) * 4;
  return (
    <Box pl={pl}>
      <Link href={'#' + node.position?.start.line.toString()} color="blue" fontSize="sm">
        {props.children}
      </Link>
    </Box>
  );
};

// マークダウンから見出しを生成
const MarkdownIndex = ({ markdown }: Props) => {
  const { isOpen, onToggle, collapseContent } = useCollapse();
  return (
    <VStack>
      <Button
        onClick={onToggle}
        size="xs"
        w="full"
        maxW="container.sm"
        rightIcon={isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
      >
        目次
      </Button>

    // とりあえず目次にするのは見出し2まで
      {collapseContent(
        <ReactMarkdown
          allowedElements={['h1', 'h2']}
          children={markdown}
          components={{
            h1: ankerLink,
            h2: ankerLink,
          }}
        />
      )}
    </VStack>
  );
};

export default MarkdownIndex;
