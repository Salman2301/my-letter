import type { Bucket } from "$lib/constant";

export type Rows = Row[];
export type Columns = Column[];

interface Column {
  key: string;
  name: string;
  hide?: boolean;
  style?: Record<string, string>;
  width?: number;
  align?: "left" | "center" | "right";

  type?: "image" | "text" | "date",
  
  typeDateFormat?: "dd MM yyyy"

  typeImageIsPrivate?: boolean;
  typeImageBucketName?: Bucket;
  typeImageAlt?: (row: Row) => string;

  render?: (row: Row) => string;

}

type Row = Record<string, string | null | boolean>;

export interface TableSetting {
  showTableCheckbox: boolean;
}
