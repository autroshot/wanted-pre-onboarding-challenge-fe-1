import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { CANCEL, DELETE } from '../../../constants/terms';

export default function DeleteAlertDialog({
  isOpen,
  todoTitle,
  onClose,
  onDelete,
}: Props) {
  const cancelRef = useRef<null | HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            ToDo {DELETE}
          </AlertDialogHeader>

          <AlertDialogBody>
            {todoTitle.length === 0
              ? `해당 ToDo를 정말 ${DELETE}하시겠습니까?`
              : `${todoTitle}을(를) 정말 ${DELETE}하시겠습니까?`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme="gray"
              ref={cancelRef}
              onClick={onClose}
              data-cy="cancel"
            >
              {CANCEL}
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              ml={3}
              data-cy="confirm"
            >
              {DELETE}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

interface Props {
  isOpen: boolean;
  todoTitle: string;
  onClose: () => void;
  onDelete: () => void;
}
