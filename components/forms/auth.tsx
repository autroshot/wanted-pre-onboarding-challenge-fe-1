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
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../../utils/auth';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ formType: type }: Props) {
  const { APIURL, buttonText } = getArguments(type);
  const { isOpen: isModalOpen, onOpen: onModalOpen } = useDisclosure();
  const [alert, setAlert] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>({ mode: 'onTouched' });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios
      .post<UsersResponseData>(APIURL, { ...data })
      .then((res) => {
        if (type === 'login') {
          login(localStorage, res.data.token);
          router.push('/');
        } else {
          onModalOpen();
        }
      })
      .catch((err: AxiosError<ErrorResponseData>) => {
        const message = err.response?.data.details;
        setAlert(message ? `${message}.` : '오류가 발생했습니다');
      });
  };

  return (
    <>
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
              errorMessage={undefinedToNull(errors.password?.message)}
              register={register}
            />

            {alert ? (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>{alert}</AlertDescription>
              </Alert>
            ) : null}

            <Button w="100%" type="submit" disabled={!isValid}>
              {buttonText}
            </Button>
          </VStack>
        </form>
      </Box>
      {type === 'login' ? null : (
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
      )}
    </>
  );

  function handleModalClose() {
    router.push('/');
  }

  function getArguments(type: FormType): Args {
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
  interface ErrorResponseData {
    details: string;
  }

  interface Args {
    APIURL: string;
    buttonText: string;
  }
}

export type FormType = 'login' | 'signUp';

interface Props {
  formType: FormType;
}
