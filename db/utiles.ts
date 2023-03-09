import { GoogleSpreadsheet } from 'google-spreadsheet';

export async function getSheet(title: SheetTitles) {
  const doc = await getDoc();

  return doc.sheetsByTitle[title];
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
