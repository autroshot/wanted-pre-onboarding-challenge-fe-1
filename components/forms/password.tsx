import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
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
        <Input pr="3rem" type={show ? 'text' : 'password'} placeholder=" " />
        <InputRightElement width="3rem">
          <IconButton
            h="1.75rem"
            size="sm"
            aria-label={show ? '숨기기' : '표시'}
            icon={show ? <ViewIcon /> : <ViewOffIcon />}
            onClick={() => setShow(!show)}
          />
        </InputRightElement>
      </InputGroup>
      <FormLabel>비밀번호</FormLabel>
      <FormErrorMessage>유효하지 않은 비밀번호입니다.</FormErrorMessage>
    </FormControl>
  );
}
