import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Path, UseFormRegister } from 'react-hook-form';

export default function EmailForm<T>({ name, register }: Props<T>) {
  return (
    <FormControl variant="floating" isRequired>
      <Input placeholder=" " {...register(name)} />
      <FormLabel>이메일</FormLabel>
      <FormErrorMessage>유효하지 않은 이메일입니다.</FormErrorMessage>
    </FormControl>
  );
}

interface Props<T> {
  name: Path<T>;
  register: UseFormRegister<T>;
}
