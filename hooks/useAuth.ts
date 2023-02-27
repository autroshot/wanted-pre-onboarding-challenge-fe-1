import { useMyStorage } from './useMyStorage';

export function useAuth() {
  const myStorage = useMyStorage();

  const loginToken = getLoginToken();
  const isLogined = loginToken !== null;

  return { loginToken, isLogined, login, logout };

  function getLoginToken() {
    if (myStorage === null) return null;
    return myStorage.getLoginToken();
  }

  function login(loginToken: string) {
    if (myStorage === null) {
      throw new Error('스토리지가 존재하지 않습니다.');
    }
    myStorage.setLoginToken(loginToken);
  }

  function logout() {
    if (myStorage === null) {
      throw new Error('스토리지가 존재하지 않습니다.');
    }
    myStorage.removeLoginToken();
  }
}
