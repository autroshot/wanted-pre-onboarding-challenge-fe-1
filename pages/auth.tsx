import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import Head from 'next/head';

export default function AuthForm() {
  return (
    <>
      <Head>
        <title>로그인 및 회원가입 | ToDo</title>
      </Head>
      <Container>
        <VStack spacing="5">
          <Heading>로그인</Heading>
          <FormControl variant="floating" id="email" isRequired>
            <Input placeholder=" " />
            <FormLabel>이메일</FormLabel>
            <FormErrorMessage>유효하지 않은 이메일입니다.</FormErrorMessage>
          </FormControl>
          <FormControl variant="floating" id="password" isRequired>
            <InputGroup>
              <Input pr="4.5rem" type="password" placeholder=" " />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  표시
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormLabel>비밀번호</FormLabel>
            <FormErrorMessage>유효하지 않은 비밀번호입니다.</FormErrorMessage>
          </FormControl>
          <Button w="100%">로그인</Button>
        </VStack>
      </Container>
    </>
  );
}
