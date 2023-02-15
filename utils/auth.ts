import { MyStorage, useMyStorage } from './storage';

export function useIsLogined() {
  return useLoginToken() !== null;
}

export function useLoginToken() {
  const myStorage = useMyStorage();

  if (myStorage === null) return null;
  return myStorage.getLoginToken();
}

export function getLoginToken(storage: Storage) {
  return new MyStorage(storage).getLoginToken();
}

export function login(storage: Storage, loginToken: string) {
  new MyStorage(storage).setLoginToken(loginToken);
}

export function logout(storage: Storage) {
  new MyStorage(storage).removeLoginToken();
}
