import { Button, Flex, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonAsLink from './buttonAsLink';

export default function Navbar() {
  return (
    <Flex
      px="6"
      py="3"
      gap="5"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
    >
      <Link as={NextLink} href="/">
        홈
      </Link>
      <Link as={NextLink} href="/todos/index">
        ToDo
      </Link>
      <Spacer display={{ base: 'none', md: 'block' }} />
      <ButtonAsLink href="/auth" text="로그인" />
      <Button>로그아웃</Button>
    </Flex>
  );
}
