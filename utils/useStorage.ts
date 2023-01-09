import { useEffect, useState } from 'react';
import MyStorage from './myStorage';

export function useStorage() {
  const [myStorage, setMyStorage] = useState<null | MyStorage>(null);

  useEffect(() => {
    setMyStorage(new MyStorage(localStorage));
  }, []);

  return myStorage;
}
