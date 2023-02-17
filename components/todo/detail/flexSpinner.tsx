import { Flex, Spinner } from '@chakra-ui/react';

export default function FlexSpinner() {
  return (
    <Flex h="100%" justify="center" align="center" data-cy="flexSpinner">
      <Spinner />
    </Flex>
  );
}
