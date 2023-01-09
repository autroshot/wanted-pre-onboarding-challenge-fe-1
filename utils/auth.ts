import { useStorage } from './storage';

export function useIsLogined() {
  const myStorage = useStorage();

  return myStorage && myStorage.getLoginToken() !== null;
}
