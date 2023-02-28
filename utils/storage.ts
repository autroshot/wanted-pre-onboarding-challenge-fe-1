export class MyStorage {
  readonly #storage: Storage;

  constructor(storage: Storage) {
    this.#storage = storage;
  }

  get(key: keys): null | string {
    return this.#storage.getItem(key);
  }
  set(key: keys, value: string): void {
    return this.#storage.setItem(key, value);
  }
  remove(key: keys): void {
    return this.#storage.removeItem(key);
  }
}

type keys = 'loginToken';
