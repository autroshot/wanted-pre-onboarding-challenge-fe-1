import { UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorResponseData } from 'types/response';
import {
  useTodoCreation,
  useTodoDeletion,
  useTodosGet,
  useTodoUpdation,
} from './queries';
import { Todo } from './types';

export function useTodo(
  loginToken: string,
  onError?: UseQueryOptions<
    Todo[],
    AxiosError<ErrorResponseData>,
    Todo[],
    string[]
  >['onError']
) {
  const { data: todos, isLoading: isTodosLoading } = useTodosGet(
    loginToken,
    onError
  );
  const { mutate: creationMutate, isLoading: isCreationLoading } =
    useTodoCreation(loginToken);
  const { mutate: updationMutate, isLoading: isUpdationLoading } =
    useTodoUpdation(loginToken);
  const { mutate: deletionMutate, isLoading: isDeletionLoading } =
    useTodoDeletion(loginToken);

  const isLoading = getIsLoading();

  return { todos, creationMutate, updationMutate, deletionMutate, isLoading };

  function getIsLoading() {
    const isLoadingArray = [
      isTodosLoading,
      isCreationLoading,
      isUpdationLoading,
      isDeletionLoading,
    ];

    return isLoadingArray.some((isLoading) => isLoading);
  }
}
