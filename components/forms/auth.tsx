import { Box, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import MyStorage from '../../utils/myStorage';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ type }: Props) {
  const { APIURL, buttonText } = getArguments(type);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onTouched' });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    axios
      .post<UsersResponseData>(APIURL, { ...data })
      .then((res) => {
        console.log(res);

        if (type === 'login') {
          new MyStorage(localStorage).setLoginToken(res.data.token);
          router.push('/');
        } else {
          console.log('회원가입 완료');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box my="5">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          <EmailForm
            name="email"
            errorMessage={undefinedToNull(errors.email?.message)}
            register={register}
          />
          <PasswordForm
            name="password"
            showFormHelperText={type === 'signUp'}
            errorMessage={undefinedToNull(errors.password?.message)}
            register={register}
          />
          <Button w="100%" type="submit">
            {buttonText}
          </Button>
        </VStack>
      </form>
    </Box>
  );

  function getArguments(type: type): Args {
    if (type === 'login') {
      return {
        APIURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
        buttonText: '로그인',
      };
    } else {
      return {
        APIURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/users/create`,
        buttonText: '회원가입',
      };
    }
  }

  function undefinedToNull<T>(param: T) {
    if (typeof param === 'undefined') return null;
    return param as Exclude<T, undefined>;
  }

  interface Inputs {
    email: string;
    password: string;
  }

  interface UsersResponseData {
    message: string;
    token: string;
  }

  interface Args {
    APIURL: string;
    buttonText: string;
  }
}

type type = 'login' | 'signUp';

export interface Props {
  type: type;
}
