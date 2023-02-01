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
            ToDo 삭제
          </AlertDialogHeader>

          <AlertDialogBody>
            {todoTitle.length === 0 ? '해당 ToDo를' : `${todoTitle}을(를)`} 정말
            삭제하시겠습니까?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} data-cy="cancel">
              취소
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              ml={3}
              data-cy="confirmDelete"
            >
              삭제
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
