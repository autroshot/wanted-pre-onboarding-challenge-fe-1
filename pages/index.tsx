import { Container, Heading, Text } from '@chakra-ui/react';
import { HOME, TODO } from 'constants/terms';
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isLogined } = useAuth();

  return (
    <>
      <Head>
        <title>
          {HOME} | {TODO}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container my="5">
        <Heading size="md">
          {isLogined ? '회원님 ' : null}ToDo에 오신 것을 환영합니다!
        </Heading>
        <Text mt="5">
          이곳은 원티드 프리온보딩 챌린지 프론트엔드 코스 사전과제를 위해
          만들어진 {TODO} 프로젝트입니다.
        </Text>
      </Container>
    </>
  );
}
