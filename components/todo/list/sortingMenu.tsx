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
  sortBy,
  order,
  onSortByChange,
  onOrderChange,
}: Props) {
  const SORT_BY = {
    default: '기본',
    title: '제목',
    createdAt: '생성된 시간',
    updatedAt: '수정된 시간',
  };
  const ORDER = {
    ascending: '오름차순',
    descending: '내림차순',
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        colorScheme="gray"
      >
        {`${getValueFromDictonary(sortBy, SORT_BY)} ${getValueFromDictonary(
          order,
          ORDER
        )}`}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue="default"
          type="radio"
          title="기준"
          onChange={(value) => onSortByChange(value as SortBy)}
        >
          {Object.entries(SORT_BY).map((entry) => (
            <MenuItemOption key={entry[0]} value={entry[0]}>
              {entry[1]}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuOptionGroup
          defaultValue="ascending"
          type="radio"
          title="정렬"
          onChange={(value) => onOrderChange(value as Order)}
        >
          {Object.entries(ORDER).map((entry) => (
            <MenuItemOption key={entry[0]} value={entry[0]}>
              {entry[1]}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );

  function getValueFromDictonary(
    key: string,
    dictionary: { [index: string]: string }
  ) {
    if (!Object.keys(dictionary).includes(key)) return key;
    return dictionary[key];
  }
}

interface Props {
  sortBy: SortBy;
  order: Order;
  onSortByChange: (soryBy: SortBy) => void;
  onOrderChange: (order: Order) => void;
}
