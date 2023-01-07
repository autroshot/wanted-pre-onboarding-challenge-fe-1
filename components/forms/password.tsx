import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

export default function PasswordForm() {
  return (
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
  );
}
