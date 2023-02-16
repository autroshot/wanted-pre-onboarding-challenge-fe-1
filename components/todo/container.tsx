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
import { TodoInputs } from '../../types/inputs';
import { undefinedToNull } from '../../utils/general';

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
  const { register, handleSubmit, setValue } = useForm<TodoInputs>();

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
          todos={undefinedToNull(todos)}
          selectedTodoId={selectedTodoId}
          isLoading={false}
          onTodoClick={handleTodoClick}
          onTodoCreate={handleTodoCreate}
        />
        <DetailContainer
          todos={undefinedToNull(todos)}
          selectedTodoId={selectedTodoId}
          isLoading={false}
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

  function onSubmit(data: TodoInputs): any | Promise<any> {
    handleTodoUpdate({ ...data });
  }

  function handleTodoCreate() {
    if (todos === null) return;

    todoCreationMutation.mutate(undefined, {
      onSuccess: (newTodo) => {
        setIsEditMode(true);

        titleRef.current?.focus();

        router.push(`/todos/${newTodo.id}`, undefined, { scroll: false });
      },
    });
  }
  function handleTodoUpdate(inputs: TodoInputs) {
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
