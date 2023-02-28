import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { CANCEL, COMPLETE, DELETE, EDIT_MODE } from '../../../constants/terms';

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
            {CANCEL}
          </Button>
          <Button size="sm" type="submit" data-cy="submit">
            {COMPLETE}
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
            {DELETE}
          </Button>
          {/* onClick을 Button에서 지정하면 해당 함수가 무시되고 onSubmit이 트리거됩니다. */}
          <Box onClick={onActivateEditModeClick}>
            <Button size="sm" type="button" data-cy="editMode">
              {EDIT_MODE}
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
