import { GoogleSpreadsheet } from 'google-spreadsheet';
import { DBTodo } from './todo/types';
import { MyWorkSheet } from './types';
import { DBUser } from './user/types';

export async function getSheet<T extends SheetTitles>(
  title: T
): Promise<ReturnTypeOfGetSheet<T>> {
  const doc = await getDoc();
  const workSheet = doc.sheetsByTitle[title];

  if (title === 'user') return workSheet as ReturnTypeOfGetSheet<T>;
  if (title === 'todo') return workSheet as ReturnTypeOfGetSheet<T>;
  throw new Error('잘못된 인수 값입니다.');
}

async function getDoc() {
  const googleSheetId = process.env.GOOGLE_SHEET_ID;
  const googleServiceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const googlePrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (
    googleSheetId === undefined ||
    googleServiceAccountEmail === undefined ||
    googlePrivateKey === undefined
  ) {
    throw new Error('환경 변수에 구글 키가 존재하지 않습니다.');
  }

  const doc = new GoogleSpreadsheet(googleSheetId);

  await doc.useServiceAccountAuth({
    client_email: googleServiceAccountEmail,
    private_key: googlePrivateKey.replace(/\\n/gm, '\n'),
  });
  await doc.loadInfo();

  return doc;
}

type SheetTitles = 'user' | 'todo';

type ReturnTypeOfGetSheet<T extends SheetTitles> = SheetTitleToWorkSheet[T];

interface SheetTitleToWorkSheet {
  user: MyWorkSheet<DBUser>;
  todo: MyWorkSheet<DBTodo>;
}
