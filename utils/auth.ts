import { MyStorage } from './storage';

export function logout(storage: Storage) {
  new MyStorage(storage).removeLoginToken();
}
