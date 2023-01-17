import { Box, HStack } from '@chakra-ui/react';
import { TodoType } from '../../../pages/todos/[id]';
import CreateButton from './createButton';
import Items from './items';
import SortingMenu from './sortingMenu';

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
        <Items
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
