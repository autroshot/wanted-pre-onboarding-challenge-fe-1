import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import { Todo } from '../../pages/todos/[id]';
import Item from './item';

export default function List({ todos, selectedTodoId, router }: Props) {
  return (
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
              <MenuOptionGroup defaultValue="default" type="radio" title="기준">
                <MenuItemOption value="default">기본</MenuItemOption>
                <MenuItemOption value="title">제목</MenuItemOption>
              </MenuOptionGroup>
              <MenuOptionGroup
                defaultValue="ascending"
                type="radio"
                title="정렬"
              >
                <MenuItemOption value="ascending">오름차순</MenuItemOption>
                <MenuItemOption value="descending">내림차순</MenuItemOption>
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
      <Box h={{ md: '25rem' }} maxH={{ base: '25rem' }} overflowY="auto">
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
  );

  function handleItemClick(todoId: string) {
    router.push(`/todos/${todoId}`);
  }
}

interface Props {
  todos: null | Todo[];
  selectedTodoId: null | string;
  router: NextRouter;
}
