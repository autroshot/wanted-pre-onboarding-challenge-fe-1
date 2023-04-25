import { Container, Heading, Text } from '@chakra-ui/react';
import { HOME, TODO } from 'constants/terms';
import Head from 'next/head';
import { useAuth } from '../hooks/use-auth';

export default function Home() {
  const { isLogined } = useAuth();

  return (
    <>
      <Head>
        <title>{`${HOME} | ${TODO}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container my="5">
        <Heading size="md">
          {isLogined ? '회원님 ' : null}ToDo에 오신 것을 환영합니다!
        </Heading>
        <Text mt="5">
          이곳은 할 일과 간단한 인증을 구현한 {TODO} 프로젝트입니다.
        </Text>
      </Container>
    </>
  );
}
