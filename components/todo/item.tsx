import { Box, Button, Text } from '@chakra-ui/react';

export default function Item({ title }: Props) {
  return (
    <Button colorScheme="gray" variant="ghost" w="100%" borderRadius="0">
      <Box w="100%">
        <Text
          align="start"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {title}
        </Text>
      </Box>
    </Button>
  );
}

interface Props {
  title: string;
}
