import {
  Box,
  Button,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Spacer,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
  return (
    <Flex
      px={6}
      py={3}
      gap={5}
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
    >
      <Link as={NextLink} href="/">
        홈
      </Link>
      <Link as={NextLink} href="/">
        ToDo
      </Link>
      <Spacer display={{ base: 'none', md: 'block' }} />
      <LinkBox>
        <NextLink href="#">
          <LinkOverlay>
            <Button as={Box}>로그인</Button>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </Flex>
  );
}
