import { GoogleSpreadsheetRow } from 'google-spreadsheet';

export interface DB {
  [index: string]: string | number | boolean;
}

export type MyRow<T extends DB> = {
  [Property in keyof T]: T[Property];
} & GoogleSpreadsheetRow;
