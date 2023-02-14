import { TableForeignKeyOptions } from 'typeorm/schema-builder/options/TableForeignKeyOptions';
import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export const FOREIGN_KEYS = {};

export const INDICES = {};

export const COLUMN_TYPES = {
  INT: 'int',
  TEXT: 'text',
  VARCHAR: 'varchar',
  BOOLEAN: 'boolean',
  TIMESTAMP_UTC: 'timestamp without time zone',
};

export const createAndUpdateDates: TableColumnOptions[] = [
  { name: 'createdAt', type: COLUMN_TYPES.TIMESTAMP_UTC, default: 'NOW()' },
  { name: 'updatedAt', type: COLUMN_TYPES.TIMESTAMP_UTC, default: 'NOW()' },
];

export const createForeignKeyOption = (
  columnName: string,
  tableName: string,
  columnId = 'id'
): TableForeignKeyOptions => {
  return {
    columnNames: [columnName],
    referencedColumnNames: [columnId],
    referencedTableName: tableName,
    onDelete: 'CASCADE',
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function EnumToArray(enumeration: any): string[] {
  return Object.keys(enumeration).map((key) => enumeration[key]);
}
