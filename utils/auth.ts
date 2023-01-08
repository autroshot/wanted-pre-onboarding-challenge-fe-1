import { NextRouter } from 'next/router';

const KEY = 'loginToken';

export function login(storage: Storage, router: NextRouter, token: string) {
  storage.setItem(KEY, token);
  router.push('/');
}

export function logout(storage: Storage, router: NextRouter) {
  storage.removeItem(KEY);
  router.push('/');
}
