import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

export default function CreateButton({ isLoading, onClick }: Props) {
  return (
    <Button
      size="sm"
      w="100%"
      aria-label="할 일 추가"
      isLoading={isLoading}
      onClick={onClick}
      data-cy="addTodo"
    >
      <AddIcon />
    </Button>
  );
}

interface Props {
  isLoading: boolean;
  onClick: () => void;
}
