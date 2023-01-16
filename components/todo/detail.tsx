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
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { Inputs, Todo } from '../../pages/todos/[id]';

export default function Detail({
  todos,
  selectedTodoId,
  isEditMode,
  titleRef,
  setIsEditMode,
  register,
  setValue,
  onTodoDelete,
  handleSubmit,
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
    setValue('id', selectedTodo.id);
    setValue('title', selectedTodo.title);
    setValue('content', selectedTodo.content);

    const { ref, ...rest } = register('title');

    return (
      <Box
        as="form"
        p="3"
        borderWidth="1px"
        borderRadius="lg"
        minH="16rem"
        onSubmit={handleSubmit}
      >
        <VStack spacing="2" h="100%">
          <input type="hidden" {...register('id')} />
          <Input
            placeholder="제목"
            readOnly={isEditMode ? false : true}
            ref={(e) => {
              ref(e);
              titleRef.current = e;
            }}
            {...rest}
          />
          <Textarea
            h="100%"
            placeholder="내용"
            resize="none"
            readOnly={isEditMode ? false : true}
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
              {isEditMode ? (
                <>
                  <Button size="sm" type="submit">
                    확인
                  </Button>
                  <Button
                    colorScheme="gray"
                    size="sm"
                    type="button"
                    onClick={() => setIsEditMode(false)}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    colorScheme="red"
                    size="sm"
                    type="button"
                    onClick={() => onTodoDelete(selectedTodoId)}
                  >
                    삭제
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => setIsEditMode(true)}
                  >
                    수정
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Flex>
        </VStack>
      </Box>
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
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  titleRef: MutableRefObject<null | HTMLInputElement>;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  onTodoDelete: (id: string) => void;
  handleSubmit: ReturnType<UseFormHandleSubmit<Inputs>>;
}
