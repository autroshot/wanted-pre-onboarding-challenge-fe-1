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
    id: '아이디',
    title: '제목',
    content: '내용',
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
        {SORT_BY[sortBy]} {ORDER[order]}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup
          defaultValue="default"
          type="radio"
          title="기준"
          onChange={(value) => onSortByChange(value as SortBy)}
        >
          <MenuItemOption value="default">기본</MenuItemOption>
          <MenuItemOption value="title">제목</MenuItemOption>
          <MenuItemOption value="createdAt">생성된 시간</MenuItemOption>
          <MenuItemOption value="updatedAt">수정된 시간</MenuItemOption>
        </MenuOptionGroup>
        <MenuOptionGroup
          defaultValue="ascending"
          type="radio"
          title="정렬"
          onChange={(value) => onOrderChange(value as Order)}
        >
          <MenuItemOption value="ascending">오름차순</MenuItemOption>
          <MenuItemOption value="descending">내림차순</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

interface Props {
  sortBy: SortBy;
  order: Order;
  onSortByChange: (soryBy: SortBy) => void;
  onOrderChange: (order: Order) => void;
}
