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
import {
  BODY,
  CONFIRM_BUTTON,
  HEADER,
} from '../constants/todos/blockUnloginedUserModal';
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
            <ModalHeader>{HEADER}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>{BODY}</Center>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleModalClose} data-cy="confirm">
                {CONFIRM_BUTTON}
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
