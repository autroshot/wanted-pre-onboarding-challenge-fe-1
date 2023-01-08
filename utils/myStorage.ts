export default class MyStorage {
  readonly #storage: Storage;

  constructor(storage: Storage) {
    this.#storage = storage;
  }

  getLoginToken() {
    return this.#get('loginToken');
  }
  setLoginToken(loginToken: string) {
    this.#set('loginToken', loginToken);
  }
  removeLoginToken() {
    this.#remove('loginToken');
  }

  #get(key: myStorageKeys): null | string {
    return this.#storage.getItem(key);
  }
  #set(key: myStorageKeys, value: string): void {
    return this.#storage.setItem(key, value);
  }
  #remove(key: myStorageKeys): void {
    return this.#storage.removeItem(key);
  }
}

type myStorageKeys = 'loginToken';
