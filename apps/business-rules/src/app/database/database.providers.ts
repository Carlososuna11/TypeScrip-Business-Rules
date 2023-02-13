import { DataSource } from 'typeorm';

import { DATABASE_CONNECTION } from '../constants';
import dataSourceOptions from './typeorm.config';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<DataSource> => {
      const dataSource = new DataSource(dataSourceOptions);
      return dataSource.initialize();
    },
  },
];
