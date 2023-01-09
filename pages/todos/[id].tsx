import {
  Button,
  Center,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useIsLogined } from '../../utils/auth';

export default function ToDo() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>ToDo | ToDo</title>
      </Head>
      {!useIsLogined() ? (
        <Modal
          size="sm"
          closeOnOverlayClick={false}
          isOpen={true}
          onClose={handleModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>알림</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>로그인이 필요합니다.</Center>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleModalClose}>확인</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Container my="5">ToDo 페이지</Container>
      )}
    </>
  );

  function handleModalClose() {
    router.push('/auth');
  }
}
