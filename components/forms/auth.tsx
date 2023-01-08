import { Box, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ APIURL, buttonText }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    axios
      .post(APIURL, { ...data })
      .then((res) => {
        console.log(res);
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
}

export interface Props {
  APIURL: string;
  buttonText: string;
}
