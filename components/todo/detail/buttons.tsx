import { Box, Button, ButtonGroup } from '@chakra-ui/react';

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
            취소
          </Button>
          <Button size="sm" type="submit" data-cy="submit">
            완료
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
            삭제
          </Button>
          {/* onClick을 Button에서 지정하면 해당 함수가 무시되고 onSubmit이 트리거됩니다. */}
          <Box onClick={onActivateEditModeClick}>
            <Button size="sm" type="button" data-cy="editMode">
              수정 모드
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
