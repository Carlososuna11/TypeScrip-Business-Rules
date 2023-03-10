import { ApiDatabaseModule } from '@business-rules22/api/database';
import { ApiProjectsModule } from '@business-rules22/api/projects';
import { ApiUploadDataModule } from '@business-rules22/api/upload-data';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // ApiDatabaseModule,
    TypeOrmModule.forRoot(),
    // ApiUploadDataModule,
    ApiProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
