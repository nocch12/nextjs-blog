import { Box, Heading, Text } from '@chakra-ui/react';
import Link from './ChakraLink';
import { dateFormat } from '$lib/date';
import { Post } from '$lib/blog';

const PostItem = ({ slug, title, date, discription, tags }: Post) => {
  return (
    <Box as="article" py={2}>
      <Link href={`/blog/posts/${slug}`}>
        <Heading as="h3" size="lg" fontWeight="bold" color="blue.700" mb={2}>
          {title}
        </Heading>
      </Link>
      <Text as="small" color="gray" display="block">
        {dateFormat(date)}
      </Text>
      {discription && <Text noOfLines={3}  mt={2}>{discription}</Text>}
    </Box>
  );
};

export default PostItem;
