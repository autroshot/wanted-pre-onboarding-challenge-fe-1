import { Box, Button, Text } from '@chakra-ui/react';

export default function Todo({
  title,
  isSelected,
  onClick,
  dataCyTodoIndex,
  dataCyTodoId,
}: Props) {
  return (
    <Button
      colorScheme="gray"
      variant="ghost"
      isActive={isSelected ? true : false}
      w="100%"
      borderRadius="0"
      onClick={onClick}
      data-cy="todo"
      data-cy-todo-index={dataCyTodoIndex}
      data-cy-todo-id={dataCyTodoId}
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
  dataCyTodoIndex: number;
  dataCyTodoId: string;
}
