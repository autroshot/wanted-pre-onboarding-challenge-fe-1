import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export default function EmailForm() {
  return (
    <FormControl variant="floating" id="email" isRequired>
      <Input placeholder=" " />
      <FormLabel>이메일</FormLabel>
      <FormErrorMessage>유효하지 않은 이메일입니다.</FormErrorMessage>
    </FormControl>
  );
}
