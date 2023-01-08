import { Box, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ APIURL, buttonText }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    axios
      .post<UsersResponseData>(APIURL, { ...data })
      .then((res) => {
        console.log(res);
        localStorage.setItem('loginToken', res.data.token);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box my="5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing="5">
          <EmailForm name="email" register={register} />
          <PasswordForm name="password" register={register} />
          <Button w="100%" type="submit">
            {buttonText}
          </Button>
        </VStack>
      </form>
    </Box>
  );

  interface Inputs {
    email: string;
    password: string;
  }

  interface UsersResponseData {
    message: string;
    token: string;
  }
}

export interface Props {
  APIURL: string;
  buttonText: string;
}
