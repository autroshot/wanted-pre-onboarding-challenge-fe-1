import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import BlockUnloginedUser from '../../components/blockUnloginedUser';

export default function ToDo() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>ToDo | ToDo</title>
      </Head>
      <BlockUnloginedUser router={router}>
        <Container my="5">ToDo 페이지</Container>
      </BlockUnloginedUser>
    </>
  );
}
