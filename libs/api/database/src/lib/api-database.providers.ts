import { TypeOrmModule } from '@nestjs/typeorm';
const {
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  POSTGRES_DB_USERNAME,
  POSTGRES_DB_PASS,
  POSTGRES_DATA_BASE,
} = process.env;

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: POSTGRES_DB_HOST,
    port: Number(POSTGRES_DB_PORT),
    username: POSTGRES_DB_USERNAME,
    password: POSTGRES_DB_PASS,
    database: POSTGRES_DATA_BASE,
    synchronize: false,
    entities: [__dirname + '../../libs/api/**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '../migrations/*{.ts,.js}'],
    retryDelay: 3000,
    retryAttempts: 10,
  }),
];
