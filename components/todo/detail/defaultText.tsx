import { Flex, Text } from '@chakra-ui/react';

export default function DefaultText() {
  return (
    <Flex h="100%" justify="center" align="center" data-cy="defaultDetail">
      <Text>목록에서 ToDo를 선택하세요.</Text>
    </Flex>
  );
}
