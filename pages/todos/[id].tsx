import { Container, SimpleGrid } from '@chakra-ui/react';
import axios, { AxiosRequestConfig } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BlockUnloginedUser from '../../components/blockUnloginedUser';
import Detail from '../../components/todo/detail';
import List from '../../components/todo/list';
import { getLoginToken } from '../../utils/auth';

export default function ToDo() {
  const router = useRouter();
  const [todos, setTodos] = useState<null | Todo[]>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<null | string>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  useEffect(() => {
    axios
      .get<GetResponseData>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/todos`,
        createAxiosRequestConfig(localStorage)
      )
      .then((res) => setTodos(res.data.data.reverse()))
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
            <List
              todos={todos}
              selectedTodoId={selectedTodoId}
              onItemClick={handleItemClick}
              onCreateTodoClick={handleTodoCreate}
            />
            <Detail
              todos={todos}
              selectedTodoId={selectedTodoId}
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              register={register}
              setValue={setValue}
              onTodoDelete={handleTodoDelete}
              handleSubmit={handleSubmit(onSubmit)}
            />
          </SimpleGrid>
        </Container>
      </BlockUnloginedUser>
    </>
  );

  function handleItemClick(todoId: string) {
    setIsEditMode(false);
    router.push(`/todos/${todoId}`, undefined, { scroll: false });
  }

  function onSubmit(data: Inputs): any | Promise<any> {
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
      })
      .catch((err) => {
        //TODO
        console.error(err);
      });
  }
  function handleTodoUpdate(inputs: Inputs) {
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

  interface GetResponseData {
    data: Todo[];
  }
  interface PostResponseData {
    data: Todo;
  }
  interface PutResponseData {
    data: Todo;
  }
}

export interface Todo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inputs {
  id: string;
  title: string;
  content: string;
}
