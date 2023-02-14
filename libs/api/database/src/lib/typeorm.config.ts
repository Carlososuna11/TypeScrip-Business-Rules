import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// TODO: Set the config globally in the app (All the enviroment variables in te config global objectu)
const config = {
  host: process.env.POSTGRES_DB_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
  user: process.env.POSTGRES_DB_USER || 'postgres',
  password: process.env.POSTGRES_DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB_DATABASE || 'my_database',
  ssl: process.env.POSTGRES_DB_USE_SSL === 'true',
  env: process.env.NODE_ENV || 'development',
};

export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  ssl: config.ssl ? { rejectUnauthorized: false } : false,
  entities: [join(__dirname, '../models/*{.ts,.js}')],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: config.env === 'production' ? 'file' : 'debug',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
};
