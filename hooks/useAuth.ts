import { useMyStorage } from './useMyStorage';

export function useAuth() {
  const myStorage = useMyStorage();

  const loginToken = getLoginToken();
  const isLogined = loginToken !== null;

  return { loginToken, isLogined };

  function getLoginToken() {
    if (myStorage === null) return null;
    return myStorage.getLoginToken();
  }
}
