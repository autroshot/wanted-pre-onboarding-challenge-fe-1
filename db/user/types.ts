import {
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

export interface DBUser {
  [index: string]: string;
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export class UserRow extends GoogleSpreadsheetRow implements DBUser {
  constructor(
    parentSheet: GoogleSpreadsheetWorksheet,
    rowNumber: number,
    data: any
  ) {
    super(parentSheet, rowNumber, data);

    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.created_at = data.created_at;
  }

  id: string;
  email: string;
  password: string;
  created_at: string;
}
