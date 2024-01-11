import type { Bucket } from "$lib/constant";
import type { Json } from "$lib/database.types";

export type Rows = Row[];
export type Columns<T extends string> = Column<T>[];

interface Column<T extends string> {
  key: T;
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

export type Row = Record<string, string | null | boolean | Json>;

export interface TableSetting {
  showTableCheckbox: boolean;
}
