import { Box, Button, Text } from '@chakra-ui/react';

export default function Item({ title, isSelected, onClick }: Props) {
  return (
    <Button
      colorScheme="gray"
      variant="ghost"
      isActive={isSelected ? true : false}
      w="100%"
      borderRadius="0"
      onClick={onClick}
    >
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
  isSelected: boolean;
  onClick: () => void;
}
