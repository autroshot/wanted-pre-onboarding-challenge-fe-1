import { useMyStorage } from './useMyStorage';

export function useLoginToken() {
  const myStorage = useMyStorage();

  if (myStorage === null) return null;
  return myStorage.getLoginToken();
}
