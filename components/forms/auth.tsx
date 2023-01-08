import { Box, Button, VStack } from '@chakra-ui/react';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ buttonText }: Props) {
  return (
    <Box my="5">
      <VStack spacing="5">
        <EmailForm />
        <PasswordForm />
        <Button w="100%">{buttonText}</Button>
      </VStack>
    </Box>
  );
}

export interface Props {
  buttonText: string;
}
