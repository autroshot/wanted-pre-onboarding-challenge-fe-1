import { Box, HStack } from '@chakra-ui/react';
import { Todo } from '../../../pages/todos/[id]';
import AddButton from './addButton';
import Item from './item';
import SortingMenu from './sortingMenu';

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
          <SortingMenu />
        </Box>
      </HStack>
      <Box mb="2">
        <AddButton onClick={onCreateTodoClick} />
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
