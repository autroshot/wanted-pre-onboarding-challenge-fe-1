import {
  Container as ChakraContainer,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import DetailContainer from '../../components/todo/detail/container';
import ListContainer from '../../components/todo/list/container';
import {
  useTodoCreation,
  useTodoDeletion,
  useTodos,
  useTodoUpdation,
} from '../../queries/todo';

export default function Container({ loginToken }: Props) {
  const [selectedTodoId, setSelectedTodoId] = useState<null | string>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    isOpen: isAlertDialogOpen,
    onOpen: onAlertDialogOpen,
    onClose: onAlertDialogClose,
  } = useDisclosure();

  const titleRef = useRef<null | HTMLInputElement>(null);

  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<InputsType>();

  const { data: todos } = useTodos(loginToken);
  const todoCreationMutation = useTodoCreation(loginToken);
  const todoUpdationMutation = useTodoUpdation(loginToken);
  const todoDeletionMutation = useTodoDeletion(loginToken);

  useEffect(() => {
    if (router.isReady) {
      setSelectedTodoId(router.query.id as string);
    }
  }, [router]);

  return (
    <ChakraContainer maxW="container.md" my="5">
      <SimpleGrid columns={[1, null, 2]} spacing="5">
        <ListContainer
          todos={todos ?? null}
          selectedTodoId={selectedTodoId}
          onTodoClick={handleTodoClick}
          onTodoCreate={handleTodoCreate}
        />
        <DetailContainer
          todos={todos ?? null}
          selectedTodoId={selectedTodoId}
          isEditMode={isEditMode}
          titleRef={titleRef}
          isAlertDialogOpen={isAlertDialogOpen}
          onAlertDialogOpen={onAlertDialogOpen}
          onAlertDialogClose={onAlertDialogClose}
          onActivateEditModeClick={() => setIsEditMode(true)}
          onDeactivateEditModeClick={() => setIsEditMode(false)}
          register={register}
          setValue={setValue}
          onTodoDelete={handleTodoDelete}
          onSubmit={handleSubmit(onSubmit)}
        />
      </SimpleGrid>
    </ChakraContainer>
  );

  function handleTodoClick(todoId: string) {
    setIsEditMode(false);
    router.push(`/todos/${todoId}`, undefined, { scroll: false });
  }

  function onSubmit(data: InputsType): any | Promise<any> {
    handleTodoUpdate({ ...data });
  }

  function handleTodoCreate() {
    if (todos === null) return;

    todoCreationMutation.mutate(undefined, {
      onSuccess: (newTodo) => {
        setSelectedTodoId(newTodo.id);
        setIsEditMode(true);
        titleRef.current?.focus();
        router.push(`/todos/${newTodo.id}`, undefined, { scroll: false });
      },
    });
  }
  function handleTodoUpdate(inputs: InputsType) {
    if (todos === null) return;

    setIsEditMode(false);

    todoUpdationMutation.mutate(inputs);
  }
  function handleTodoDelete(id: string) {
    if (todos === null) return;
    if (selectedTodoId === null) return;

    todoDeletionMutation.mutate(id, { onSuccess: () => onAlertDialogClose() });
  }
}

interface Props {
  loginToken: string;
}

// Inputs 컴포넌트와의 이름 충돌 때문에 이름으로 InputsType을 사용합니다.
export interface InputsType {
  id: string;
  title: string;
  content: string;
}
