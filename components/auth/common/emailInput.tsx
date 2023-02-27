import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ERROR_MESSAGE } from './constants';

export default function EmailInput<T>({
  name,
  errorMessage,
  register,
}: Props<T>) {
  const EMAIL_REG_EXP =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~\.]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
  let registerOptions: RegisterOptions = {
    required: { value: true, message: ERROR_MESSAGE.REQUIRED },
    pattern: {
      value: EMAIL_REG_EXP,
      message: ERROR_MESSAGE.EMAIL_PATTERN,
    },
  };

  return (
    <FormControl
      variant="floating"
      isRequired
      isInvalid={Boolean(errorMessage)}
    >
      <Input
        placeholder=" "
        {...register(name, registerOptions)}
        data-cy="emailInput"
      />
      <FormLabel>이메일</FormLabel>
      {errorMessage ? (
        <FormErrorMessage data-cy="emailErrorMessage">
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
