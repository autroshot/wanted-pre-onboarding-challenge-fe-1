import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import PasswordForm from './password';

export default function AuthForm() {
  return (
    <VStack spacing="5">
      <Heading>로그인</Heading>
      <FormControl variant="floating" id="email" isRequired>
        <Input placeholder=" " />
        <FormLabel>이메일</FormLabel>
        <FormErrorMessage>유효하지 않은 이메일입니다.</FormErrorMessage>
      </FormControl>
      <PasswordForm />
      <Button w="100%">로그인</Button>
    </VStack>
  );
}
