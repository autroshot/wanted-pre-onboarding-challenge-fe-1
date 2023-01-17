import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';

export default function SortingMenu() {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        colorScheme="gray"
      >
        기본 오름차순
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="default" type="radio" title="기준">
          <MenuItemOption value="default">기본</MenuItemOption>
          <MenuItemOption value="title">제목</MenuItemOption>
        </MenuOptionGroup>
        <MenuOptionGroup defaultValue="ascending" type="radio" title="정렬">
          <MenuItemOption value="ascending">오름차순</MenuItemOption>
          <MenuItemOption value="descending">내림차순</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
