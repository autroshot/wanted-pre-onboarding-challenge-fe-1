import { Container, SimpleGrid } from '@chakra-ui/react';
import axios from 'axios';
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

  const { register, setValue } = useForm<Inputs>();

  useEffect(() => {
    axios
      .get<TodosResponseData>(`${process.env.NEXT_PUBLIC_SERVER_URL}/todos`, {
        headers: { authorization: getLoginToken(localStorage) },
      })
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
  console.log('render');

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
            />
            <Detail
              todos={todos}
              selectedTodoId={selectedTodoId}
              register={register}
              setValue={setValue}
            />
          </SimpleGrid>
        </Container>
      </BlockUnloginedUser>
    </>
  );

  function handleItemClick(todoId: string) {
    router.push(`/todos/${todoId}`, undefined, { scroll: false });
  }

  interface TodosResponseData {
    data: Todo[];
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
  title: string;
  content: string;
}
