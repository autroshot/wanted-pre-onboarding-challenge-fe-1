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
import { CONFIRM, LOGIN, NOTICE } from '../constants/text';
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
          <ModalContent data-cy="blockUnloginedUserModal">
            <ModalHeader>{NOTICE}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>{`${LOGIN}이 필요합니다.`}</Center>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleModalClose} data-cy="confirm">
                {CONFIRM}
              </Button>
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
