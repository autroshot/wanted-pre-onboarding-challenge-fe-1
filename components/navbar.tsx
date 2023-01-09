import { Button, Flex, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyStorage } from '../utils/myStorage';
import ButtonAsLink from './buttonAsLink';

export default function Navbar() {
  const [myStorage, setMyStorage] = useState<null | MyStorage>(null);
  const router = useRouter();

  useEffect(() => {
    setMyStorage(new MyStorage(localStorage));
  }, []);

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
      {isLogined() ? (
        <Button
          onClick={() => {
            (myStorage as MyStorage).removeLoginToken();
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

  function isLogined() {
    return myStorage && myStorage.getLoginToken() !== null;
  }
}
