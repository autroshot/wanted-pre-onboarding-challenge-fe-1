import { useEffect, useState } from 'react';
import { MyStorage } from '../utils/storage';

export function useMyStorage() {
  const [myStorage, setMyStorage] = useState<null | MyStorage>(null);

  useEffect(() => {
    setMyStorage(new MyStorage(localStorage));
  }, []);

  return myStorage;
}
