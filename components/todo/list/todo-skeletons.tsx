import { Box, Skeleton, Text } from '@chakra-ui/react';

export default function TodoSkeletons() {
  const LENGTH = 10;

  return <>{createTodoSkeletons(LENGTH)}</>;

  function createTodoSkeletons(length: number) {
    const result = [];

    for (let i = 0; i < length; i++) {
      result.push(
        <Box
          key={i}
          w="100%"
          h="2.5rem"
          m="0"
          px="1rem"
          display="inline-flex"
          alignItems="center"
        >
          <Skeleton w="100%">
            <Text>loading</Text>
          </Skeleton>
        </Box>
      );
    }

    return result;
  }
}
