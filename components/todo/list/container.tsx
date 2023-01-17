import { Box, HStack } from '@chakra-ui/react';
import { TodoType } from '../../../pages/todos/[id]';
import CreateButton from './createButton';
import SortingMenu from './sortingMenu';
import Todos from './todos';

export default function Container({
  todos,
  selectedTodoId,
  onTodoClick,
  onTodoCreate,
}: Props) {
  return (
    <Box>
      <HStack mb="2">
        <Box>
          <SortingMenu />
        </Box>
      </HStack>
      <Box mb="2">
        <CreateButton onClick={onTodoCreate} />
      </Box>
      <Box h={{ md: '25rem' }} maxH={{ base: '25rem' }} overflowY="auto">
        <Todos
          todos={todos}
          selectedTodoId={selectedTodoId}
          onTodoClick={onTodoClick}
        />
      </Box>
    </Box>
  );
}

interface Props {
  todos: null | TodoType[];
  selectedTodoId: null | string;
  onTodoClick: (todoId: string) => void;
  onTodoCreate: () => void;
}
