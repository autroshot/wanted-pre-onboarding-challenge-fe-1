import { Box, Button, Container } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BlockUnloginedUser from '../../components/blockUnloginedUser';

export default function ToDo() {
  const [test, setTest] = useState(50);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ToDo | ToDo</title>
      </Head>
      <BlockUnloginedUser router={router}>
        <Container my="5">
          <Box>url: {router.query.id}</Box>
          <Box>test: {test}</Box>
          <Box my="5">
            <Button onClick={handleClick1}>url 변경</Button>
          </Box>
          <Box my="5">
            <Button onClick={handleClick2}>상태 변경</Button>
          </Box>
        </Container>
      </BlockUnloginedUser>
    </>
  );

  function handleClick1() {
    router.push(`/todostest/${Number(router.query.id) + 1}`);
  }
  function handleClick2() {
    setTest(test + 1);
  }
}
