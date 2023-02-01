import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { Order, SortBy } from './container';

export default function SortingMenu({
  defaultSortBy,
  defaultOrder,
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
}: Props) {
  const SORT_BY: Dictionary = {
    createdAt: '생성된 시간',
    updatedAt: '수정된 시간',
    title: '제목',
  };
  const ORDER: Dictionary = {
    ascending: '오름차순',
    descending: '내림차순',
  };

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
          onChange={(value) => onSortByChange(value as SortBy)}
        >
          {createMenuItemOptions(SORT_BY)}
        </MenuOptionGroup>
        <MenuOptionGroup
          defaultValue={defaultOrder}
          type="radio"
          title="정렬"
          onChange={(value) => onOrderChange(value as Order)}
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
  defaultSortBy: SortBy;
  defaultOrder: Order;
  sortBy: SortBy;
  order: Order;
  onSortByChange: (soryBy: SortBy) => void;
  onOrderChange: (order: Order) => void;
}
