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
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Inputs, Todo } from '../../pages/todos/[id]';

export default function Detail({
  todos,
  selectedTodoId,
  register,
  setValue,
}: Props) {
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
    const selectedTodo = todos.find(
      (todo) => todo.id === selectedTodoId
    ) as Todo;
    setValue('title', selectedTodo.title);
    setValue('content', selectedTodo.content);

    return (
      <VStack spacing="2" h="100%">
        <Input placeholder="제목" readOnly {...register('title')} />
        <Textarea
          h="100%"
          placeholder="내용"
          resize="none"
          readOnly
          {...register('content')}
        />
        <Box w="100%">
          <Text fontSize="xs">
            생성된 시간: {toKoreanTime(selectedTodo.createdAt)}
          </Text>
        </Box>
        <Box w="100%">
          <Text fontSize="xs">
            수정된 시간: {toKoreanTime(selectedTodo.updatedAt)}
          </Text>
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

  function toKoreanTime(ISOString: string) {
    const date = new Date(Date.parse(ISOString));
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  }
}

export interface Props {
  todos: null | Todo[];
  selectedTodoId: null | string;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
}
