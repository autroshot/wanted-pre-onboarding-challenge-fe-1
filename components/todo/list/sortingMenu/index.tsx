import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { TodoSortBy, TodoSortOrder } from '../../types';
import { ORDER, SORT_BY } from './contants';

export default function SortingMenu({
  defaultSortBy,
  defaultOrder,
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
}: Props) {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        colorScheme="gray"
        data-cy="sortingButton"
      >
        {`${getValueFromDictonary(sortBy, SORT_BY)} ${getValueFromDictonary(
          order,
          ORDER
        )}`}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue={defaultSortBy}
          type="radio"
          title="기준"
          onChange={(value) => onSortByChange(value as TodoSortBy)}
        >
          {createMenuItemOptions(SORT_BY)}
        </MenuOptionGroup>
        <MenuOptionGroup
          defaultValue={defaultOrder}
          type="radio"
          title="정렬"
          onChange={(value) => onOrderChange(value as TodoSortOrder)}
        >
          {createMenuItemOptions(ORDER)}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );

  function getValueFromDictonary(key: string, dictionary: Dictionary) {
    if (!Object.keys(dictionary).includes(key)) return key;
    return dictionary[key];
  }

  function createMenuItemOptions(dictionary: Dictionary) {
    return Object.entries(dictionary).map((entry) => (
      <MenuItemOption key={entry[0]} value={entry[0]}>
        {entry[1]}
      </MenuItemOption>
    ));
  }

  interface Dictionary {
    [index: string]: string;
  }
}

interface Props {
  defaultSortBy: TodoSortBy;
  defaultOrder: TodoSortOrder;
  sortBy: TodoSortBy;
  order: TodoSortOrder;
  onSortByChange: (soryBy: TodoSortBy) => void;
  onOrderChange: (order: TodoSortOrder) => void;
}
