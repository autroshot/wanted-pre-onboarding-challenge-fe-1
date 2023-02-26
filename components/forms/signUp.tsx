import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorResponseData } from '../../types/response';
import { undefinedToNull } from '../../utils/general';
import EmailForm from './email';
import { signup as signupFetcher } from './fetchers';
import PasswordForm from './password';

export default function SignUpForm() {
  const { isOpen: isModalOpen, onOpen: onModalOpen } = useDisclosure();
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
        <form noValidate onSubmit={handleSubmit(onSubmit)} data-cy="signUpForm">
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
              회원가입
            </Button>
          </VStack>
        </form>
      </Box>

      <Modal
        size="sm"
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>알림</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>🎉 회원가입 완료 🎉</Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleModalClose}>확인</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  function onSubmit(data: Inputs): any | Promise<any> {
    setIsLoading(true);

    signupFetcher(data.email, data.password)
      .then(() => {
        onModalOpen();
      })
      .catch((err: AxiosError<ErrorResponseData>) => {
        const message = err.response?.data.details;
        setServerErrorMessage(message ? `${message}.` : '오류가 발생했습니다.');
      })
      .then(() => setIsLoading(false));
  }

  function handleModalClose() {
    router.push('/');
  }

  interface Inputs {
    email: string;
    password: string;
  }
}
