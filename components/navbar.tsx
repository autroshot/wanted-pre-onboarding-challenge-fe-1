import { Button, Flex, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
  return (
    <Flex alignItems="center">
      <Link as={NextLink} href="/">
        홈
      </Link>
      <Link as={NextLink} href="/">
        ToDo
      </Link>
      <Spacer />
      <Button>로그인</Button>
    </Flex>
  );
}
