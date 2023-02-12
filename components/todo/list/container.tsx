import { Box, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { TodoType } from '../../../types/todo';
import CreateButton from './createButton';
import SortingMenu from './sortingMenu';
import Todos from './todos';

export default function Container({
  todos,
  selectedTodoId,
  onTodoClick,
  onTodoCreate,
}: Props) {
  const DEFAULT_SORT_BY: SortBy = 'createdAt';
  const DEFAULT_ORDER: Order = 'descending';

  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT_BY);
  const [order, setOrder] = useState<Order>(DEFAULT_ORDER);

  const sortedTodos = sortTodos(todos, sortBy, order);

  return (
    <Box>
      <HStack mb="2">
        <Box>
          <SortingMenu
            defaultSortBy={DEFAULT_SORT_BY}
            defaultOrder={DEFAULT_ORDER}
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
          todos={sortedTodos}
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

  function sortTodos(todos: null | TodoType[], sortBy: SortBy, order: Order) {
    if (todos === null) return todos;
    return [...todos].sort((a, b) => {
      const localeCompareValue = a[sortBy].localeCompare(b[sortBy]);

      if (order === 'ascending') return localeCompareValue;
      return localeCompareValue * -1;
    });
  }
}

interface Props {
  todos: null | TodoType[];
  selectedTodoId: null | string;
  onTodoClick: (todoId: string) => void;
  onTodoCreate: () => void;
}

export type SortBy = Extract<
  'title' | 'createdAt' | 'updatedAt',
  keyof TodoType
>;
export type Order = 'ascending' | 'descending';
