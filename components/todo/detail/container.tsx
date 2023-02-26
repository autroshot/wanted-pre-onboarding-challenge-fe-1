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
import { TodoInputs, TodoType } from '../types';
import Buttons from './buttons';
import DefaultText from './defaultText';
import DeleteAlertDialog from './deleteAlertDialog';
import DisplayTimeContainer from './displayTime/container';
import FlexSpinner from './flexSpinner';
import Inputs from './inputs';

export default function Container({
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
  } else {
    const selectedTodo = todos.find(
      (todo) => todo.id === selectedTodoId
    ) as TodoType;
    setValue('id', selectedTodo.id);
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
              <DisplayTimeContainer
                title="생성된 시간"
                ISOString={selectedTodo.createdAt}
                dataCy="createdAt"
              />
              <DisplayTimeContainer
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
  }

  function isValidTodoId(todoId: string, todos: TodoType[]) {
    if (todoId.length !== 21) return false;
    return todos.some((todo) => {
      return todo.id === todoId;
    });
  }
}

interface Props {
  todos: null | TodoType[];
  selectedTodoId: null | string;
  isLoading: boolean;
  isEditMode: boolean;
  titleRef: MutableRefObject<null | HTMLInputElement>;
  alertDialogDisclosure: UseDisclosureReturn;
  register: UseFormRegister<TodoInputs>;
  setValue: UseFormSetValue<TodoInputs>;
  onActivateEditModeClick: () => void;
  onDeactivateEditModeClick: () => void;
  onTodoDelete: (id: string) => void;
  onSubmit: ReturnType<UseFormHandleSubmit<TodoInputs>>;
}
