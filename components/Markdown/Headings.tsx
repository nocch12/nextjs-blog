import { PropsWithChildren } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';

type Props = PropsWithChildren<HeadingProps>;

export const H2 = (props: Props) => {
  return (
    <Heading
      as="h2"
      fontSize="3xl"
      fontWeight="bold"
      mt={12}
      mb={4}
      borderBottomWidth={6}
      borderBottomColor="blue.700"
      borderBottomStyle="double"
      {...props}
    />
  );
};

export const H3 = (props: Props) => {
  return <Heading as="h3" fontSize="2xl" fontWeight="bold" my={4} {...props} />;
};

export const H4 = (props: Props) => {
  return <Heading as="h4" fontSize="xl" fontWeight="bold" my={4} {...props} />;
};

export const H5 = (props: Props) => {
  return <Heading as="h5" fontSize="lg" fontWeight="bold" my={4} {...props} />;
};

export const H6 = (props: Props) => {
  return <Heading as="h6" fontWeight="bold" my={4} {...props} />;
};
