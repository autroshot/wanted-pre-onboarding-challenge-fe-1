import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import AuthForm from '../components/forms/auth';

export default function Auth() {
  return (
    <>
      <Head>
        <title>로그인 및 회원가입 | ToDo</title>
      </Head>
      <Container>
        <AuthForm />
      </Container>
    </>
  );
}
