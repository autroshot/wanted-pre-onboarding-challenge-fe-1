import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { Todo } from '../../pages/todos/[id]';

export default function Detail({ todos, selectedTodoId }: Props) {
  if (
    !todos ||
    !selectedTodoId ||
    todos.length === 0 ||
    !isValidTodoId(selectedTodoId, todos)
  ) {
    return (
      <Flex h="100%" justify="center" align="center">
        <Text>목록에서 ToDo를 선택하세요.</Text>
      </Flex>
    );
  } else {
    return (
      <VStack spacing="2" h="100%">
        <Input placeholder="제목" />
        <Textarea h="100%" placeholder="내용" resize="none" />
        <Box w="100%">
          <Text fontSize="xs">생성된 시간:</Text>
        </Box>
        <Box w="100%">
          <Text fontSize="xs">수정된 시간:</Text>
        </Box>
        <Flex w="100%">
          <Spacer />
          <ButtonGroup>
            <Button colorScheme="red" size="sm">
              삭제
            </Button>
            <Button size="sm">수정</Button>
          </ButtonGroup>
        </Flex>
      </VStack>
    );
  }

  function isValidTodoId(todoId: string, todos: Todo[]) {
    if (todoId.length !== 21) return false;
    return todos.some((todo) => {
      return todo.id === todoId;
    });
  }
}

export interface Props {
  todos: null | Todo[];
  selectedTodoId: null | string;
}
