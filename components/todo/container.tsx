import {
  Container as ChakraContainer,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createTodo,
  deleteTodo,
  getTodos,
  TodoId,
  TodoToUpdate,
  updateTodo,
} from '../../apis/todo';
import DetailContainer from '../../components/todo/detail/container';
import ListContainer from '../../components/todo/list/container';

export default function Container({ loginToken }: Props) {
  const [selectedTodoId, setSelectedTodoId] = useState<null | string>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onAlertDialogOpen,
    onClose: onAlertDialogClose,
  } = useDisclosure();

  const titleRef = useRef<null | HTMLInputElement>(null);

  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<InputsType>();

  const TODOS_QUERY_KEY = ['todos'];
  const queryClient = useQueryClient();
  const { data: todos } = useQuery(TODOS_QUERY_KEY, () => getTodos(loginToken));
  const createTodoMutation = useMutation({
    mutationFn: () => createTodo(loginToken),
    onSuccess: (newTodo) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) return [newTodo, ...oldTodos];
      });

      setSelectedTodoId(newTodo.id);
      setIsEditMode(true);
      titleRef.current?.focus();
      router.push(`/todos/${newTodo.id}`, undefined, { scroll: false });
    },
  });
  const updateTodoMutation = useMutation({
    mutationFn: (todoToUpdate: TodoToUpdate) =>
      updateTodo(loginToken, todoToUpdate),
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) {
          return oldTodos.map((todo) => {
            if (todo.id === updatedTodo.id) return updatedTodo;
            return todo;
          });
        }
      });
    },
  });
  const deleteTodoMutation = useMutation({
    mutationFn: (todoId: TodoId) => deleteTodo(loginToken, todoId),
    onSuccess: (data, todoId) => {
      queryClient.setQueryData<TodoType[]>(TODOS_QUERY_KEY, (oldTodos) => {
        if (oldTodos) {
          return oldTodos.filter((todo) => todo.id !== todoId);
        }
      });
      onAlertDialogClose();
    },
  });

  useEffect(() => {
    if (router.isReady) {
      setSelectedTodoId(router.query.id as string);
    }
  }, [router]);

  return (
    <ChakraContainer maxW="container.md" my="5">
      <SimpleGrid columns={[1, null, 2]} spacing="5">
        <ListContainer
          todos={todos ?? null}
          selectedTodoId={selectedTodoId}
          onTodoClick={handleTodoClick}
          onTodoCreate={handleTodoCreate}
        />
        <DetailContainer
          todos={todos ?? null}
          selectedTodoId={selectedTodoId}
          isEditMode={isEditMode}
          titleRef={titleRef}
          isAlertDialogOpen={isAlertDialogOpen}
          onAlertDialogOpen={onAlertDialogOpen}
          onAlertDialogClose={onAlertDialogClose}
          onActivateEditModeClick={() => setIsEditMode(true)}
          onDeactivateEditModeClick={() => setIsEditMode(false)}
          register={register}
          setValue={setValue}
          onTodoDelete={handleTodoDelete}
          onSubmit={handleSubmit(onSubmit)}
        />
      </SimpleGrid>
    </ChakraContainer>
  );

  function handleTodoClick(todoId: string) {
    setIsEditMode(false);
    router.push(`/todos/${todoId}`, undefined, { scroll: false });
  }

  function onSubmit(data: InputsType): any | Promise<any> {
    handleTodoUpdate({ ...data });
  }

  function handleTodoCreate() {
    if (todos === null) return;

    createTodoMutation.mutate();
  }
  function handleTodoUpdate(inputs: InputsType) {
    if (todos === null) return;

    setIsEditMode(false);

    updateTodoMutation.mutate(inputs);
  }
  function handleTodoDelete(id: string) {
    if (todos === null) return;
    if (selectedTodoId === null) return;

    deleteTodoMutation.mutate(id);
  }
}

interface Props {
  loginToken: string;
}

// Todo 컴포넌트와의 이름 충돌 때문에 이름으로 TodoType을 사용합니다.
export interface TodoType {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// Inputs 컴포넌트와의 이름 충돌 때문에 이름으로 InputsType을 사용합니다.
export interface InputsType {
  id: string;
  title: string;
  content: string;
}
