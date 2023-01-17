import { Input, Textarea } from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { InputsType } from '../../../pages/todos/[id]';

export default function Inputs({ isEditMode, titleRef, register }: Props) {
  const { ref, ...rest } = register('title');

  return (
    <>
      <input type="hidden" {...register('id')} />
      <Input
        placeholder="제목"
        readOnly={isEditMode ? false : true}
        ref={(e) => {
          ref(e);
          titleRef.current = e;
        }}
        {...rest}
      />
      <Textarea
        h="100%"
        placeholder="내용"
        resize="none"
        readOnly={isEditMode ? false : true}
        {...register('content')}
      />
    </>
  );
}

export interface Props {
  isEditMode: boolean;
  titleRef: MutableRefObject<null | HTMLInputElement>;
  register: UseFormRegister<InputsType>;
}
