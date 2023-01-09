import { useStorage } from './useStorage';

export function useIsLogined() {
  const myStorage = useStorage();

  return myStorage && myStorage.getLoginToken() !== null;
}
