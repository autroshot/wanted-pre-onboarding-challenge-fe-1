import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import {
  CANCEL_BUTTON,
  COMPLETE_BUTTON,
  DELETE_BUTTON,
  EDIT_MODE_BUTTON,
} from '../../../constants/todos/detail';

export default function Buttons({
  isEditMode,
  onAlertDialogOpen,
  onActivateEditModeClick,
  onDeactivateEditModeClick,
}: Props) {
  return (
    <ButtonGroup>
      {isEditMode ? (
        <>
          <Button
            colorScheme="gray"
            size="sm"
            type="button"
            onClick={onDeactivateEditModeClick}
            data-cy="cancel"
          >
            {CANCEL_BUTTON}
          </Button>
          <Button size="sm" type="submit" data-cy="submit">
            {COMPLETE_BUTTON}
          </Button>
        </>
      ) : (
        <>
          <Button
            colorScheme="red"
            size="sm"
            type="button"
            onClick={() => onAlertDialogOpen()}
            data-cy="delete"
          >
            {DELETE_BUTTON}
          </Button>
          {/* onClick을 Button에서 지정하면 해당 함수가 무시되고 onSubmit이 트리거됩니다. */}
          <Box onClick={onActivateEditModeClick}>
            <Button size="sm" type="button" data-cy="editMode">
              {EDIT_MODE_BUTTON}
            </Button>
          </Box>
        </>
      )}
    </ButtonGroup>
  );
}

interface Props {
  isEditMode: boolean;
  onAlertDialogOpen: () => void;
  onActivateEditModeClick: () => void;
  onDeactivateEditModeClick: () => void;
}
