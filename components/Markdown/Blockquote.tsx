import { PropsWithChildren } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

// 引用符
const Blockquote = (props: PropsWithChildren<BoxProps>) => {
  return (
    <Box
      {...props}
      as="blockquote"
      pl={4}
      position="relative"
      _before={{
        content: `""`,
        position: 'absolute',
        height: '100%',
        ml: -4,
        borderLeftStyle: 'solid',
        borderLeftWidth: 4,
      }}
    />
  );
};

export default Blockquote;
