import { Module } from '@nestjs/common';
import { DatabaseProvider } from './api-database.providers';

@Module({
  imports: [...DatabaseProvider],
  exports: [...DatabaseProvider],
})
export class ApiDatabaseModule {}
