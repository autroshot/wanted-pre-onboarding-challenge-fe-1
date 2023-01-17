import { Box, HStack } from '@chakra-ui/react';
import { useState } from 'react';
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
  const [sortBy, setSortBy] = useState<SortBy>('default');
  const [order, setOrder] = useState<Order>('ascending');

  return (
    <Box>
      <HStack mb="2">
        <Box>
          <SortingMenu
            sortBy={sortBy}
            order={order}
            onSortByChange={handleSortByChange}
            onOrderChange={handleOrderChange}
          />
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

  function handleSortByChange(sortBy: SortBy) {
    setSortBy(sortBy);
  }
  function handleOrderChange(order: Order) {
    setOrder(order);
  }
}

interface Props {
  todos: null | TodoType[];
  selectedTodoId: null | string;
  onTodoClick: (todoId: string) => void;
  onTodoCreate: () => void;
}

export type SortBy =
  | 'default'
  | Extract<'title' | 'createdAt' | 'updatedAt', keyof TodoType>;
export type Order = 'ascending' | 'descending';
