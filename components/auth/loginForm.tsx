import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { LOGIN } from 'constants/terms';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { ErrorResponseData } from '../../types/response';
import { undefinedToNull } from '../../utils/general';
import EmailInput from './common/emailInput';
import PasswordInput from './common/passwordInput';
import { login as loginFetcher } from './fetchers';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({ mode: 'onTouched' });

  const router = useRouter();

  const { login } = useAuth();

  return (
    <>
      <Box my="5">
        <form noValidate onSubmit={handleSubmit(onSubmit)} data-cy="loginForm">
          <VStack spacing="5">
            <EmailInput
              name="email"
              errorMessage={undefinedToNull(errors.email?.message)}
              register={register}
            />
            <PasswordInput
              name="password"
              errorMessage={undefinedToNull(errors.password?.message)}
              register={register}
            />

            {errorMessage ? (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : null}

            <Button
              w="100%"
              type="submit"
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              data-cy="submitButton"
            >
              {LOGIN}
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
        login(res.token);

        router.push('/');
      })
      .catch((err) => {
        if (err instanceof AxiosError<ErrorResponseData>) {
          const message = err.response?.data.details;

          setErrorMessage(message ? `${message}.` : '오류가 발생했습니다.');

          return;
        }
        if (err instanceof Error) {
          setErrorMessage(err.message);

          return;
        }
        throw err;
      })
      .then(() => setIsLoading(false));
  }

  interface Inputs {
    email: string;
    password: string;
  }
}
