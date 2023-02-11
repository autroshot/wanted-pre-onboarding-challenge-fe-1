import {
  Container as ChakraContainer,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../../apis/todo';
import DetailContainer from '../../components/todo/detail/container';
import ListContainer from '../../components/todo/list/container';

export default function Container({ loginToken }: Props) {
  // const [todos, setTodos] = useState<null | TodoType[]>(null);
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

  const { data: todos, isSuccess } = useQuery(['todos'], () =>
    getTodos(loginToken)
  );

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

    createTodo(loginToken)
      .then((res) => {
        const newTodo = res.data.data;

        setTodos([newTodo, ...todos]);
        setSelectedTodoId(newTodo.id);
        setIsEditMode(true);
        titleRef.current?.focus();
        router.push(`/todos/${newTodo.id}`, undefined, { scroll: false });
      })
      .catch((err) => {
        //TODO
        console.error(err);
      });
  }
  function handleTodoUpdate(inputs: InputsType) {
    if (todos === null) return;

    setIsEditMode(false);

    updateTodo(loginToken, inputs)
      .then((res) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id !== inputs.id) return todo;

          const updatedTodo = res.data.data;
          return updatedTodo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => {
        //TODO
        console.error(err);
      });
  }
  function handleTodoDelete(id: string) {
    if (todos === null) return;
    if (selectedTodoId === null) return;

    deleteTodo(loginToken, selectedTodoId)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        onAlertDialogClose();
      })
      .catch((err) => {
        //TODO
        console.error(err);
      });
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
