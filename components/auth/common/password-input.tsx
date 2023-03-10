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
import { PASSWORD } from 'constants/terms';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function PasswordInput({ errorMessage, registerReturn }: Props) {
  const [show, setShow] = useState(false);

  return (
    <FormControl
      variant="floating"
      isRequired
      isInvalid={Boolean(errorMessage)}
    >
      <InputGroup>
        <Input
          pr="3rem"
          type={show ? 'text' : 'password'}
          placeholder=" "
          {...registerReturn}
          data-cy="passwordInput"
        />
        {/* CSS 선택자 때문에 레이블이 이곳에 위치해야 합니다. */}
        <FormLabel>{PASSWORD}</FormLabel>
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
      {errorMessage ? (
        <FormErrorMessage data-cy="passwordErrorMessage">
          {errorMessage}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

interface Props {
  registerReturn: UseFormRegisterReturn;
  errorMessage: null | string;
}
