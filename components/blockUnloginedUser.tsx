import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { NextRouter } from 'next/router';
import { useIsLogined } from '../utils/auth';

export default function BlockUnloginedUser({ router, children }: Props) {
  return (
    <>
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
        <>{children}</>
      )}
    </>
  );

  function handleModalClose() {
    router.push('/auth');
  }
}

interface Props {
  router: NextRouter;
  children: React.ReactNode;
}
