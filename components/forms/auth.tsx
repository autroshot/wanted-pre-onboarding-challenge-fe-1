import {
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
import axios from 'axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import MyStorage from '../../utils/myStorage';
import EmailForm from './email';
import PasswordForm from './password';

export default function AuthForm({ type }: Props) {
  const { APIURL, buttonText } = getArguments(type);
  const { isOpen, onOpen } = useDisclosure();

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
        if (type === 'login') {
          new MyStorage(localStorage).setLoginToken(res.data.token);
          router.push('/');
        } else {
          onOpen();
        }
      })
      .catch((err) => {
        console.log(err);
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
              type={type}
              errorMessage={undefinedToNull(errors.password?.message)}
              register={register}
            />
            <Button w="100%" type="submit">
              {buttonText}
            </Button>
          </VStack>
        </form>
      </Box>
      {type === 'login' ? null : (
        <Modal
          size="sm"
          closeOnOverlayClick={false}
          isOpen={isOpen}
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

  interface Args {
    APIURL: string;
    buttonText: string;
  }
}

export type FormType = 'login' | 'signUp';

interface Props {
  type: FormType;
}
