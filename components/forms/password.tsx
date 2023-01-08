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
import { Path, UseFormRegister } from 'react-hook-form';

export default function PasswordForm<T>({
  name,
  showFormHelperText,
  register,
}: Props<T>) {
  const [show, setShow] = useState(false);

  return (
    <FormControl variant="floating" isRequired>
      <InputGroup>
        <Input
          pr="3rem"
          type={show ? 'text' : 'password'}
          placeholder=" "
          {...register(name)}
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
      {showFormHelperText ? <FormHelperText>8자 이상</FormHelperText> : null}
      <FormErrorMessage>유효하지 않은 비밀번호입니다.</FormErrorMessage>
    </FormControl>
  );
}

interface Props<T> {
  name: Path<T>;
  showFormHelperText: boolean;
  register: UseFormRegister<T>;
}
