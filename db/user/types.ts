import { DB, MyRow } from 'db/types';

export interface DBUser extends DB {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export type UserRow = MyRow<DBUser>;
