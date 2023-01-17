import { Box, HStack } from '@chakra-ui/react';
import { TodoType } from '../../../pages/todos/[id]';
import CreateButton from './createButton';
import SortingMenu from './sortingMenu';
import Todos from './todos';

export default function Container({
  todos,
  selectedTodoId,
  onItemClick,
  onCreateButtonClick,
}: Props) {
  return (
    <Box>
      <HStack mb="2">
        <Box>
          <SortingMenu />
        </Box>
      </HStack>
      <Box mb="2">
        <CreateButton onClick={onCreateButtonClick} />
      </Box>
      <Box h={{ md: '25rem' }} maxH={{ base: '25rem' }} overflowY="auto">
        <Todos
          todos={todos}
          selectedTodoId={selectedTodoId}
          onItemClick={onItemClick}
        />
      </Box>
    </Box>
  );
}

interface Props {
  todos: null | TodoType[];
  selectedTodoId: null | string;
  onItemClick: (todoId: string) => void;
  onCreateButtonClick: () => void;
}
