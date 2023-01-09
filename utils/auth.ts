import { MyStorage, useStorage } from './storage';

export function useIsLogined() {
  const myStorage = useStorage();

  return myStorage !== null && myStorage.getLoginToken() !== null;
}

export function login(storage: Storage, loginToken: string) {
  new MyStorage(storage).setLoginToken(loginToken);
}
