import { Container, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getTodos } from '../../apis/todo';
import BlockUnloginedUser from '../../components/blockUnloginedUser';
import DetailContainer from '../../components/todo/detail/container';
import ListContainer from '../../components/todo/list/container';
import { getLoginToken } from '../../utils/auth';

export default function ToDo() {
  const [todos, setTodos] = useState<null | TodoType[]>(null);
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

  useEffect(() => {
    getTodos(localStorage)
      .then((res) => setTodos(res.data.data))
      .catch((err) => {
        //TODO
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setSelectedTodoId(router.query.id as string);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>ToDo | ToDo</title>
      </Head>
      <BlockUnloginedUser router={router}>
        <Container maxW="container.md" my="5">
          <SimpleGrid columns={[1, null, 2]} spacing="5">
            <ListContainer
              todos={todos}
              selectedTodoId={selectedTodoId}
              onTodoClick={handleTodoClick}
              onTodoCreate={handleTodoCreate}
            />
            <DetailContainer
              todos={todos}
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
        </Container>
      </BlockUnloginedUser>
    </>
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

    axios
      .post<PostResponseData>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
        { title: '', content: '' },
        createAxiosRequestConfig(localStorage)
      )
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

    axios
      .put<PutResponseData>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${selectedTodoId}`,
        { title: inputs.title, content: inputs.content },
        createAxiosRequestConfig(localStorage)
      )
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

    axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/todos/${selectedTodoId}`,
        createAxiosRequestConfig(localStorage)
      )
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
        onAlertDialogClose();
      })
      .catch((err) => {
        //TODO
        console.error(err);
      });
  }

  function createAxiosRequestConfig(storage: Storage): AxiosRequestConfig {
    return {
      headers: { authorization: getLoginToken(storage) },
    };
  }

  interface PostResponseData {
    data: TodoType;
  }
  interface PutResponseData {
    data: TodoType;
  }
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
