import { TypeOrmModule } from '@nestjs/typeorm';
const { MOONGOSE_DEBUG } = process.env;

export const DatabaseProvider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'my_db',
    synchronize: false,
    entities: [__dirname + '../../libs/api/**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '../migrations/*{.ts,.js}'],
    retryDelay: 3000,
    retryAttempts: 10
  }),
];