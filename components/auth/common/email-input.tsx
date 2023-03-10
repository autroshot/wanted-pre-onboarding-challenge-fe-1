import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { EMAIL } from 'constants/terms';
import { UseFormRegisterReturn } from 'react-hook-form';

export default function EmailInput({ errorMessage, registerReturn }: Props) {
  return (
    <FormControl
      variant="floating"
      isRequired
      isInvalid={Boolean(errorMessage)}
    >
      <Input placeholder=" " {...registerReturn} data-cy="emailInput" />
      <FormLabel>{EMAIL}</FormLabel>
      {errorMessage ? (
        <FormErrorMessage data-cy="emailErrorMessage">
          {errorMessage}
        </FormErrorMessage>
      ) : null}
    </FormControl>
  );
}

interface Props {
  registerReturn: UseFormRegisterReturn;
  errorMessage: null | string;
}
