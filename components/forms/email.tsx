import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Path, UseFormRegister } from 'react-hook-form';

export default function EmailForm<T>({
  name,
  errorMessage,
  register,
}: Props<T>) {
  return (
    <FormControl
      variant="floating"
      isRequired
      isInvalid={Boolean(errorMessage)}
    >
      <Input
        placeholder=" "
        {...register(name, {
          required: { value: true, message: '필숫값입니다.' },
        })}
      />
      <FormLabel>이메일</FormLabel>
      {errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

interface Props<T> {
  name: Path<T>;
  errorMessage: null | string;
  register: UseFormRegister<T>;
}
