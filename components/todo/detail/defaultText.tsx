import { Flex, Text } from '@chakra-ui/react';
import { DEFAULT } from '../../../constants/todos/detail';

export default function DefaultText() {
  return (
    <Flex h="100%" justify="center" align="center">
      <Text>{DEFAULT}</Text>
    </Flex>
  );
}
