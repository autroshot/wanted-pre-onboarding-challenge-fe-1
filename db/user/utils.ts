import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { nanoid } from 'nanoid';
import { User, UserInput } from '../../types/user';
import { getSheet } from '../utiles';
import { DBUser } from './types';

export function createDBUser(userInput: UserInput): DBUser {
  return {
    ...userInput,
    id: nanoid(),
    created_at: new Date().toISOString(),
  };
}
export function createDBUsers(userInputs: UserInput[]): DBUser[] {
  return userInputs.map(createDBUser);
}

export async function addUser(DBUser: DBUser): Promise<void> {
  const userSheet = await getSheet('user');

  await userSheet.addRow(DBUser);
}
export async function addUsers(DBUsers: DBUser[]): Promise<void> {
  const userSheet = await getSheet('user');

  await userSheet.addRows(DBUsers);
}

export async function getUserRows(): Promise<GoogleSpreadsheetRow[]> {
  const userSheet = await getSheet('user');
  const userRows = await userSheet.getRows();

  return userRows;
}

export function getUsers(userRows: GoogleSpreadsheetRow[]): User[] {
  return userRows.map((userRow) => {
    return {
      id: userRow.id,
      email: userRow.email,
      password: userRow.password,
      createdAt: userRow.created_at,
    };
  });
}

export function toUser(DBUser: DBUser): User {
  return {
    id: DBUser.id,
    email: DBUser.email,
    password: DBUser.password,
    createdAt: DBUser.created_at,
  };
}
