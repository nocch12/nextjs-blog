import { PropsWithChildren } from 'react';
import { Heading, HeadingProps } from '@chakra-ui/react';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

type Props = PropsWithChildren<HeadingProps & ReactMarkdownProps>;

export const H2 = (props: Props) => {
  return (
    <Heading
      id={props.node.position?.start.line.toString()}
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
  return (
    <Heading
      id={props.node.position?.start.line.toString()}
      as="h3"
      fontSize="2xl"
      fontWeight="bold"
      my={4}
      {...props}
    />
  );
};

export const H4 = (props: Props) => {
  return (
    <Heading
      id={props.node.position?.start.line.toString()}
      as="h4"
      fontSize="xl"
      fontWeight="bold"
      my={4}
      {...props}
    />
  );
};

export const H5 = (props: Props) => {
  return <Heading as="h5" fontSize="lg" fontWeight="bold" my={4} {...props} />;
};

export const H6 = (props: Props) => {
  return <Heading as="h6" fontSize="md" fontWeight="bold" my={4} {...props} />;
};
