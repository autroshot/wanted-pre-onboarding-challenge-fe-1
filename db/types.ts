import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
  PaginationOptions,
} from 'google-spreadsheet';

export interface UserDB extends DBIndexSignature {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export interface TodoDB extends DBIndexSignature {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export type MyRow<T extends DBIndexSignature> = {
  [Property in keyof T]: T[Property];
} & GoogleSpreadsheetRow;

export class MyWorkSheet<
  db extends DBIndexSignature
> extends GoogleSpreadsheetWorksheet {
  async getRows(options?: PaginationOptions): Promise<MyRow<db>[]> {
    return (await super.getRows(options)) as MyRow<db>[];
  }

  async addRow(
    values:
      | {
          [header: string]: string | number | boolean;
        }
      | Array<string | number | boolean>,
    options?: { raw: boolean; insert: boolean }
  ): Promise<MyRow<db>> {
    return (await super.addRow(values, options)) as MyRow<db>;
  }

  async addRows(
    rowValues: Array<
      | {
          [header: string]: string | number | boolean;
        }
      | Array<string | number | boolean>
    >,
    options?: { raw: boolean; insert: boolean }
  ): Promise<MyRow<db>[]> {
    return (await super.addRows(rowValues, options)) as MyRow<db>[];
  }
}

export type SheetTitles = 'user' | 'todo';

export type ReturnTypeOfGetSheet<T extends SheetTitles> =
  SheetTitleToWorkSheet[T];

interface SheetTitleToWorkSheet {
  user: MyWorkSheet<UserDB>;
  todo: MyWorkSheet<TodoDB>;
}

interface DBIndexSignature {
  [key: string]: string | number | boolean;
}
