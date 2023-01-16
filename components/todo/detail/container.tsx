import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { Inputs, Todo } from '../../../pages/todos/[id]';
import DeleteAlertDialog from '../deleteAlertDialog';
import DefaultText from './defaultText';
import InputsComponent from './inputs';

export default function Container({
  todos,
  selectedTodoId,
  isEditMode,
  titleRef,
  isAlertDialogOpen,
  onAlertDialogOpen,
  onAlertDialogClose,
  onActivateEditModeClick,
  onDeactivateEditModeClick,
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
    return <DefaultText />;
  } else {
    const selectedTodo = todos.find(
      (todo) => todo.id === selectedTodoId
    ) as Todo;
    setValue('id', selectedTodo.id);
    setValue('title', selectedTodo.title);
    setValue('content', selectedTodo.content);

    const { ref, ...rest } = register('title');

    return (
      <>
        <Box
          as="form"
          p="3"
          borderWidth="1px"
          borderRadius="lg"
          minH="16rem"
          onSubmit={handleSubmit}
        >
          <VStack spacing="2" h="100%">
            <InputsComponent
              isEditMode={isEditMode}
              titleRef={titleRef}
              register={register}
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
                    <Button
                      colorScheme="gray"
                      size="sm"
                      type="button"
                      onClick={onDeactivateEditModeClick}
                    >
                      취소
                    </Button>
                    <Button size="sm" type="submit">
                      완료
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      colorScheme="red"
                      size="sm"
                      type="button"
                      onClick={() => onAlertDialogOpen()}
                    >
                      삭제
                    </Button>
                    {/* onClick을 Button에서 지정하면 해당 함수가 무시되고 onSubmit이 트리거됩니다. */}
                    <Box onClick={onActivateEditModeClick}>
                      <Button size="sm" type="button">
                        수정 모드
                      </Button>
                    </Box>
                  </>
                )}
              </ButtonGroup>
            </Flex>
          </VStack>
        </Box>

        <DeleteAlertDialog
          isOpen={isAlertDialogOpen}
          todoTitle={selectedTodo.title}
          onClose={onAlertDialogClose}
          onDelete={() => onTodoDelete(selectedTodoId)}
        />
      </>
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
  titleRef: MutableRefObject<null | HTMLInputElement>;
  isAlertDialogOpen: boolean;
  onAlertDialogOpen: () => void;
  onAlertDialogClose: () => void;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  onActivateEditModeClick: () => void;
  onDeactivateEditModeClick: () => void;
  onTodoDelete: (id: string) => void;
  handleSubmit: ReturnType<UseFormHandleSubmit<Inputs>>;
}
