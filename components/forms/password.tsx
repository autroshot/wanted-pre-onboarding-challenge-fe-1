import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function PasswordForm() {
  const [show, setShow] = useState(false);

  return (
    <FormControl variant="floating" id="password" isRequired>
      <InputGroup>
        <Input pr="5rem" type={show ? 'text' : 'password'} placeholder=" " />
        <InputRightElement width="5rem">
          <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
            {show ? '숨기기' : '표시'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormLabel>비밀번호</FormLabel>
      <FormErrorMessage>유효하지 않은 비밀번호입니다.</FormErrorMessage>
    </FormControl>
  );
}
