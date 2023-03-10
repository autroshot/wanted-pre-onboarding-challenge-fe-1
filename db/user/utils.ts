import { UserDB } from 'db/types';
import { nanoid } from 'nanoid';
import { User, UserInput } from '../../types/user';
import { getSheet } from '../utiles';
import { UserRow } from './types';

export function createDBUser(userInput: UserInput): UserDB {
  return {
    ...userInput,
    id: nanoid(),
    created_at: new Date().toISOString(),
  };
}
export function createDBUsers(userInputs: UserInput[]): UserDB[] {
  return userInputs.map(createDBUser);
}

export async function addUser(DBUser: UserDB): Promise<void> {
  const userSheet = await getSheet('user');

  await userSheet.addRow(DBUser);
}
export async function addUsers(DBUsers: UserDB[]): Promise<void> {
  const userSheet = await getSheet('user');

  await userSheet.addRows(DBUsers);
}

export async function getUserRows(): Promise<UserRow[]> {
  const userSheet = await getSheet('user');
  const userRows = await userSheet.getRows();

  return userRows as UserRow[];
}

export function getUsers(userRows: UserRow[]): User[] {
  return userRows.map((userRow) => {
    return {
      id: userRow.id,
      email: userRow.email,
      password: userRow.password,
      createdAt: userRow.created_at,
    };
  });
}

export function toUser(DBUser: UserDB): User {
  return {
    id: DBUser.id,
    email: DBUser.email,
    password: DBUser.password,
    createdAt: DBUser.created_at,
  };
}
