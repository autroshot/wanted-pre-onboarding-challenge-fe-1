import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Link,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import ButtonAsLink from './buttonAsLink';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  const { isLogined, logout } = useAuth();

  return (
    <Flex
      px="6"
      py="3"
      gap="5"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
      data-cy="navbar"
    >
      <Link as={NextLink} href="/">
        홈
      </Link>
      <Link as={NextLink} href="/todos/index">
        ToDo
      </Link>
      <Spacer display={{ base: 'none', md: 'block' }} />
      <IconButton
        aria-label="다크 모드"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
      {isLogined ? (
        <Button
          onClick={() => {
            logout();

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
