import { useStorage } from './storage';

export function useIsLogined() {
  const myStorage = useStorage();

  return myStorage !== null && myStorage.getLoginToken() !== null;
}
