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
import { Todo } from '../../../pages/todos/[id]';
import Item from '../item';

export default function Container({
  todos,
  selectedTodoId,
  onItemClick,
  onCreateTodoClick,
}: Props) {
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
        <Button
          size="sm"
          w="100%"
          aria-label="할 일 추가"
          onClick={onCreateTodoClick}
        >
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
                  onClick={() => onItemClick(todo.id)}
                />
              );
            })
          : null}
      </Box>
    </Box>
  );
}

interface Props {
  todos: null | Todo[];
  selectedTodoId: null | string;
  onItemClick: (todoId: string) => void;
  onCreateTodoClick: () => void;
}
