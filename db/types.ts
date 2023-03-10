import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
  PaginationOptions,
} from 'google-spreadsheet';

export interface DB {
  [index: string]: string | number | boolean;
}

export type MyRow<T extends DB> = {
  [Property in keyof T]: T[Property];
} & GoogleSpreadsheetRow;

export class MyWorkSheet<db extends DB> extends GoogleSpreadsheetWorksheet {
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
