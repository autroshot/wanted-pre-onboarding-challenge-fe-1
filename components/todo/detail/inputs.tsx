import { Input, Textarea } from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from '../../../pages/todos/[id]';

// 다른 모듈과의 이름 충돌 때문에 컴포넌트 이름으로 Inputs 대신 InputsComponent를 사용합니다.
export default function InputsComponent({
  isEditMode,
  titleRef,
  register,
}: Props) {
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
  register: UseFormRegister<Inputs>;
}
