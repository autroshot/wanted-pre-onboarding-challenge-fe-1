import { Box, Button, Text } from '@chakra-ui/react';

export default function Todo({
  title,
  isSelected,
  onClick,
  dataCyTodoNo,
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
      data-cy-todo-no={dataCyTodoNo}
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
  dataCyTodoNo: number;
  dataCyTodoId: string;
}
