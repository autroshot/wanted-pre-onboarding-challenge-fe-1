import { useStorage } from './myStorage';

export function useIsLogined() {
  const myStorage = useStorage();

  return myStorage && myStorage.getLoginToken() !== null;
}
