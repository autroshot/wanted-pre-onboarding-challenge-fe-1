import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import BlockUnloginedUser from '../../components/blockUnloginedUser';
import Detail from '../../components/todo/detail';
import Item from '../../components/todo/item';
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
            <Box>
              <HStack mb="2">
                <Box>
                  <Menu closeOnSelect={false}>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      colorScheme="gray"
                    >
                      기본 오름차순
                    </MenuButton>
                    <MenuList minWidth="240px">
                      <MenuOptionGroup
                        defaultValue="default"
                        type="radio"
                        title="기준"
                      >
                        <MenuItemOption value="default">기본</MenuItemOption>
                        <MenuItemOption value="title">제목</MenuItemOption>
                      </MenuOptionGroup>
                      <MenuOptionGroup
                        defaultValue="ascending"
                        type="radio"
                        title="정렬"
                      >
                        <MenuItemOption value="ascending">
                          오름차순
                        </MenuItemOption>
                        <MenuItemOption value="descending">
                          내림차순
                        </MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Box>
              </HStack>
              <Box mb="2">
                <Button size="sm" w="100%" aria-label="할 일 추가">
                  <AddIcon />
                </Button>
              </Box>
              <Box
                h={{ md: '25rem' }}
                maxH={{ base: '25rem' }}
                overflowY="auto"
              >
                {todos
                  ? todos.map((todo) => {
                      return (
                        <Item
                          key={todo.id}
                          title={todo.title}
                          isSelected={todo.id === selectedTodoId}
                          onClick={() => handleItemClick(todo.id)}
                        />
                      );
                    })
                  : null}
              </Box>
            </Box>
            <Box p="3" borderWidth="1px" borderRadius="lg" minH="16rem">
              <Detail
                todos={todos}
                selectedTodoId={selectedTodoId}
                register={register}
                setValue={setValue}
              />
            </Box>
          </SimpleGrid>
        </Container>
      </BlockUnloginedUser>
    </>
  );

  function handleItemClick(todoId: string) {
    router.push(`/todos/${todoId}`);
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
