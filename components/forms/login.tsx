import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorResponseData } from '../../types/response';
import { login } from '../../utils/auth';
import { undefinedToNull } from '../../utils/general';
import EmailForm from './email';
import { login as loginFetcher } from './fetchers';
import PasswordForm from './password';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<null | string>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({ mode: 'onTouched' });
  const router = useRouter();

  return (
    <>
      <Box my="5">
        <form noValidate onSubmit={handleSubmit(onSubmit)} data-cy="loginForm">
          <VStack spacing="5">
            <EmailForm
              name="email"
              errorMessage={undefinedToNull(errors.email?.message)}
              register={register}
            />
            <PasswordForm
              name="password"
              errorMessage={undefinedToNull(errors.password?.message)}
              register={register}
            />

            {serverErrorMessage ? (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{serverErrorMessage}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              w="100%"
              type="submit"
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              data-cy="submitButton"
            >
              로그인
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );

  function onSubmit(data: Inputs): any | Promise<any> {
    setIsLoading(true);

    loginFetcher(data.email, data.password)
      .then((res) => {
        login(localStorage, res.token);

        router.push('/');
      })
      .catch((err: AxiosError<ErrorResponseData>) => {
        const message = err.response?.data.details;

        setServerErrorMessage(message ? `${message}.` : '오류가 발생했습니다.');
      })
      .then(() => setIsLoading(false));
  }

  interface Inputs {
    email: string;
    password: string;
  }
}
