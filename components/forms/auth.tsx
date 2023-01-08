import { Box, Button, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ buttonText }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <Box my="5">
      <VStack spacing="5">
        <EmailForm name="email" register={register} />
        <PasswordForm name="password" register={register} />
        <Button w="100%">{buttonText}</Button>
      </VStack>
    </Box>
  );

  interface Inputs {
    email: string;
    password: string;
  }
}

export interface Props {
  buttonText: string;
}
