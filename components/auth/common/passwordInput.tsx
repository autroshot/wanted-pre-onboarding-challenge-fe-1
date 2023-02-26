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
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ERROR_MESSAGE } from './constants';

export default function PasswordInput<T>({
  name,
  errorMessage,
  register,
}: Props<T>) {
  const [show, setShow] = useState(false);

  let registerOptions: RegisterOptions = {
    required: { value: true, message: ERROR_MESSAGE.REQUIRED },
    minLength: { value: 8, message: ERROR_MESSAGE.PASSWORD_MIN_LENGTH },
  };

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
          {...register(name, registerOptions)}
          data-cy="passwordInput"
        />
        {/* CSS 선택자 때문에 레이블이 이곳에 위치해야 합니다. */}
        <FormLabel>비밀번호</FormLabel>
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

interface Props<T> {
  name: Path<T>;
  errorMessage: null | string;
  register: UseFormRegister<T>;
}
