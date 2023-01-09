import { Button, Flex, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { logout, useIsLogined } from '../utils/auth';
import ButtonAsLink from './buttonAsLink';

export default function Navbar() {
  const router = useRouter();

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
      {useIsLogined() ? (
        <Button
          onClick={() => {
            logout(localStorage);
            router.push('/');
          }}
        >
          로그아웃
        </Button>
      ) : (
        <ButtonAsLink href="/auth" text="로그인" />
      )}
    </Flex>
  );
}
