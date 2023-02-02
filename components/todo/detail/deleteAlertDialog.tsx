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
import {
  CANCEL_BUTTON,
  DELETE_ALERT_DIALOG_BODY,
  DELETE_ALERT_DIALOG_BODY_WITH_EMPTY_TODO_TITLE,
  DELETE_ALERT_DIALOG_HEADER,
  DELETE_BUTTON,
} from '../../../constants/todos/detail';

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
            {DELETE_ALERT_DIALOG_HEADER}
          </AlertDialogHeader>

          <AlertDialogBody>
            {todoTitle.length === 0
              ? `${DELETE_ALERT_DIALOG_BODY_WITH_EMPTY_TODO_TITLE}`
              : `${todoTitle}${DELETE_ALERT_DIALOG_BODY}`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} data-cy="cancel">
              {CANCEL_BUTTON}
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              ml={3}
              data-cy="confirm"
            >
              {DELETE_BUTTON}
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
