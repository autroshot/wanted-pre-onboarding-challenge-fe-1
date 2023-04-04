import {
  Box,
  Flex,
  Spacer,
  UseDisclosureReturn,
  VStack,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { Todo, TodoInput } from 'types/todo';
import Buttons from './buttons';
import DefaultText from './default-text';
import DeleteAlertDialog from './delete-alert-dialog';
import DisplayTime from './display-time';
import FlexSpinner from './flex-spinner';
import Inputs from './inputs';

export default function Detail({
  todos,
  selectedTodoId,
  isLoading,
  isEditMode,
  titleRef,
  alertDialogDisclosure: {
    isOpen: isAlertDialogOpen,
    onOpen: onAlertDialogOpen,
    onClose: onAlertDialogClose,
  },
  onActivateEditModeClick,
  onDeactivateEditModeClick,
  register,
  setValue,
  onTodoDelete,
  onSubmit,
}: Props) {
  if (isLoading) {
    return <FlexSpinner />;
  }
  if (
    !todos ||
    !selectedTodoId ||
    todos.length === 0 ||
    !isValidTodoId(selectedTodoId, todos)
  ) {
    return <DefaultText />;
  }
  const selectedTodo = todos.find((todo) => todo.id === selectedTodoId) as Todo;
  setValue('title', selectedTodo.title);
  setValue('content', selectedTodo.content);

  return (
    <>
      <Box
        as="form"
        p="3"
        borderWidth="1px"
        borderRadius="lg"
        minH="16rem"
        onSubmit={onSubmit}
      >
        <VStack spacing="2" h="100%">
          <Inputs
            isEditMode={isEditMode}
            titleRef={titleRef}
            register={register}
          />

          <VStack w="100%" spacing="2" align="start">
            <DisplayTime
              title="생성된 시간"
              ISOString={selectedTodo.createdAt}
              dataCy="createdAt"
            />
            <DisplayTime
              title="수정된 시간"
              ISOString={selectedTodo.updatedAt}
              dataCy="updatedAt"
            />
          </VStack>

          <Flex w="100%">
            <Spacer />
            <Buttons
              isEditMode={isEditMode}
              onAlertDialogOpen={onAlertDialogOpen}
              onActivateEditModeClick={onActivateEditModeClick}
              onDeactivateEditModeClick={onDeactivateEditModeClick}
            />
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

  function isValidTodoId(todoId: string, todos: Todo[]) {
    if (todoId.length !== 21) return false;
    return todos.some((todo) => {
      return todo.id === todoId;
    });
  }
}

interface Props {
  todos: null | Todo[];
  selectedTodoId: null | string;
  isLoading: boolean;
  isEditMode: boolean;
  titleRef: MutableRefObject<null | HTMLInputElement>;
  alertDialogDisclosure: UseDisclosureReturn;
  register: UseFormRegister<TodoInput>;
  setValue: UseFormSetValue<TodoInput>;
  onActivateEditModeClick: () => void;
  onDeactivateEditModeClick: () => void;
  onTodoDelete: (id: string) => void;
  onSubmit: ReturnType<UseFormHandleSubmit<TodoInput>>;
}
