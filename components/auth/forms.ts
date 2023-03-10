import { RegisterOptions, useForm } from 'react-hook-form';
import { ERROR_MESSAGE } from './common/constants';
import { Input } from './types';

export function useAuthForm() {
  const useFormReturn = useForm<Input>({ mode: 'onTouched' });

  const EMAIL_REG_EXP =
    /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~\.]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+$/;
  const emailRegisterOptions: RegisterOptions = {
    required: { value: true, message: ERROR_MESSAGE.REQUIRED },
    pattern: {
      value: EMAIL_REG_EXP,
      message: ERROR_MESSAGE.EMAIL_PATTERN,
    },
  };

  const emailUseFormRegisterReturn = useFormReturn.register(
    'email',
    emailRegisterOptions
  );

  const passwordRegisterOptions: RegisterOptions = {
    required: { value: true, message: ERROR_MESSAGE.REQUIRED },
    minLength: { value: 8, message: ERROR_MESSAGE.PASSWORD_MIN_LENGTH },
  };

  const passwordUseFormRegisterReturn = useFormReturn.register(
    'password',
    passwordRegisterOptions
  );

  return {
    ...useFormReturn,
    emailUseFormRegisterReturn,
    passwordUseFormRegisterReturn,
  };
}
