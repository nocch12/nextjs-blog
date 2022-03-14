import { OgpData } from '$types/blog';
import {
  Link,
  LinkProps,
  LinkBox,
  Box,
  Flex,
  Img,
  Text,
  LinkOverlay,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

type Props = PropsWithChildren<
  LinkProps &
    ReactMarkdownProps & {
      ogpData?: OgpData;
    }
>;

const AnchorLink = ({ color, ogpData, ...props }: Props) => {
  // ogpがある場合、カード形式で表示
  const { children, href } = props;
  if (
    children.length &&
    children[0] === href &&
    ogpData &&
    ogpData.title &&
    ogpData.image
  ) {
    return (
      <LinkBox w="full" my={4}>
        <Flex w="full" maxW="full" rounded="md" borderWidth={1} overflow="hidden">
          <Img src={ogpData.image} alt={href} objectFit="cover" w={[32, 44]} h="32" />
          <Flex py={[4, 6]} px={4} flexDir="column">
            <LinkOverlay href={href} fontSize="lg" fontWeight="bold">
              {ogpData.title}
            </LinkOverlay>
            <Box flexGrow={1}>
              <Text noOfLines={1} color="gray">{ogpData.description || null}</Text>
            </Box>
            <Text noOfLines={1} as="small" fontSize="small">{ogpData.site_name || ogpData.url || null}</Text>
          </Flex>
        </Flex>
      </LinkBox>
    );
  }

  // ogpがなければ通常リンク
  return <Link color="blue" {...props} />;
};

export default AnchorLink;
