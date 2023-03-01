import {
  Container as ChakraContainer,
  SimpleGrid,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorResponseData } from '../../types/response';
import { undefinedToNull } from '../../utils/general';
import DetailContainer from './detail/container';
import { useTodo } from './hooks';
import ListContainer from './list/container';
import { TodoInputs } from './types';

export default function Container({ loginToken }: Props) {
  const [selectedTodoId, setSelectedTodoId] = useState<null | string>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const alertDialogDisclosure = useDisclosure();

  const titleRef = useRef<null | HTMLInputElement>(null);

  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<TodoInputs>();

  const errorToast = useToast({
    status: 'error',
    title: '오류',
    isClosable: true,
  });

  const { todos, creationMutate, updationMutate, deletionMutate, isLoading } =
    useTodo(loginToken, handleError);

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
          isLoading={isLoading}
          onTodoClick={handleTodoClick}
          onTodoCreate={handleTodoCreate}
        />
        <DetailContainer
          todos={undefinedToNull(todos)}
          selectedTodoId={selectedTodoId}
          isLoading={isLoading}
          isEditMode={isEditMode}
          titleRef={titleRef}
          alertDialogDisclosure={alertDialogDisclosure}
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

    creationMutate(undefined, {
      onSuccess: (newTodo) => {
        setIsEditMode(true);

        titleRef.current?.focus();

        router.push(`/todos/${newTodo.id}`, undefined, { scroll: false });
      },
      onError: handleError,
    });
  }
  function handleTodoUpdate(inputs: TodoInputs) {
    if (todos === null) return;

    setIsEditMode(false);

    updationMutate(inputs, {
      onError: handleError,
    });
  }
  function handleTodoDelete(id: string) {
    if (todos === null) return;
    if (selectedTodoId === null) return;

    deletionMutate(id, {
      onSuccess: () => alertDialogDisclosure.onClose(),
      onError: handleError,
    });
  }

  function getErrorMessage(err: AxiosError<ErrorResponseData>) {
    return err.response?.data.details ?? err.message ?? null;
  }

  function handleError(err: AxiosError<ErrorResponseData>) {
    errorToast({
      description: getErrorMessage(err),
    });
  }
}

interface Props {
  loginToken: string;
}
