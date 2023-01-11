import { AddIcon } from '@chakra-ui/icons';
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
import BlockUnloginedUser from '../../components/blockUnloginedUser';
import Detail from '../../components/todo/detail';
import Item from '../../components/todo/item';
import { getLoginToken } from '../../utils/auth';

export default function ToDo() {
  const router = useRouter();
  const [todos, setTodos] = useState<null | Todo[]>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<null | string>(null);

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
                    <MenuButton as={Button} colorScheme="gray">
                      정렬 항목
                    </MenuButton>
                    <MenuList minWidth="240px">
                      <MenuOptionGroup defaultValue="default" type="radio">
                        <MenuItemOption value="default">기본</MenuItemOption>
                        <MenuItemOption value="title">제목</MenuItemOption>
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Box>
                <Box>
                  <Button colorScheme="gray">오름차순</Button>
                </Box>
              </HStack>
              <Box mb="2">
                <Button size="sm" w="100%" aria-label="할 일 추가">
                  <AddIcon />
                </Button>
              </Box>
              <Box>
                {todos
                  ? todos.map((todo) => {
                      return <Item key={todo.id} title={todo.title} />;
                    })
                  : null}
              </Box>
            </Box>
            <Box p="3" borderWidth="1px" borderRadius="lg">
              <Detail todos={todos} selectedTodoId={selectedTodoId} />
            </Box>
          </SimpleGrid>
        </Container>
      </BlockUnloginedUser>
    </>
  );

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
