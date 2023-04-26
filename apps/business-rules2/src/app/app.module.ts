import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiDatabaseModule } from '@business-rules22/api/database';
import { ApiUploadDataModule } from '@business-rules22/business-rules2/src/upload-data';
import { ApiProjectsModule } from '@business-rules22/business-rules2/src/projects';
import { ApiDataDomainModule } from '@business-rules22/business-rules2/src/data-domain';

@Module({
  imports: [
    ApiDatabaseModule,
    ApiUploadDataModule,
    ApiProjectsModule,
    ApiDataDomainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
