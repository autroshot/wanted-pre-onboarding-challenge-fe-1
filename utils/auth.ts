import { MyStorage } from './storage';

export function login(storage: Storage, loginToken: string) {
  new MyStorage(storage).setLoginToken(loginToken);
}

export function logout(storage: Storage) {
  new MyStorage(storage).removeLoginToken();
}
