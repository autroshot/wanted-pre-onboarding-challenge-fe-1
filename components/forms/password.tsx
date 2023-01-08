import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormType } from './auth';

export default function PasswordForm<T>({
  name,
  type,
  errorMessage,
  register,
}: Props<T>) {
  const [show, setShow] = useState(false);

  let registerOptions: RegisterOptions = {};
  if (type === 'login') {
    registerOptions = {
      required: { value: true, message: '필숫값입니다.' },
    };
  } else {
    registerOptions = {
      required: { value: true, message: '필숫값입니다.' },
      minLength: { value: 8, message: '8자 이상만 가능합니다.' },
    };
  }

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
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
      {type === 'signUp' ? (
        <FormHelperText>비밀번호는 8자 이상만 가능합니다.</FormHelperText>
      ) : null}
    </FormControl>
  );
}

interface Props<T> {
  name: Path<T>;
  type: FormType;
  errorMessage: null | string;
  register: UseFormRegister<T>;
}
