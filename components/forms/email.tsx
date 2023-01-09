import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { FormType } from './auth';

export default function EmailForm<T>({
  name,
  type,
  errorMessage,
  register,
}: Props<T>) {
  const EMAIL_REG_EXP =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~\.]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
  let registerOptions: RegisterOptions = {};
  if (type === 'login') {
    registerOptions = {
      required: { value: true, message: '필숫값입니다.' },
    };
  } else {
    registerOptions = {
      required: { value: true, message: '필숫값입니다.' },
      pattern: {
        value: EMAIL_REG_EXP,
        message: '유효하지 않은 이메일 형식입니다.',
      },
    };
  }

  return (
    <FormControl
      variant="floating"
      isRequired
      isInvalid={Boolean(errorMessage)}
    >
      <Input placeholder=" " {...register(name, registerOptions)} />
      <FormLabel>이메일</FormLabel>
      {errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
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
