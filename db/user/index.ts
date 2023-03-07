import { User, UserInput } from '../../types/user';
import { getSheet } from '../utiles';
import {
  addUser,
  addUsers,
  createDBUser,
  createDBUsers,
  getUserRows,
  getUsers,
  toUser,
} from './utils';

export async function selectUser(
  predicate: (user: User) => boolean
): Promise<User | null> {
  const userRows = await getUserRows();

  const users = getUsers(userRows);

  return users.find(predicate) ?? null;
}

export async function insertUser(userInput: UserInput): Promise<User> {
  const newDBUser = createDBUser(userInput);

  await addUser(newDBUser);

  return toUser(newDBUser);
}
export async function insertUsers(userInputs: UserInput[]): Promise<void> {
  const newDBUsers = createDBUsers(userInputs);

  await addUsers(newDBUsers);
}

export async function deleteAllUsers() {
  const userSheet = await getSheet('user');

  await userSheet.clearRows();
}
