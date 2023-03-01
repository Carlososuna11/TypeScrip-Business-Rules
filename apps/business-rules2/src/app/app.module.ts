import { ApiDatabaseModule } from '@business-rules22/api/database';
import { ApiUploadDataModule } from '@business-rules22/api/upload-data';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiDatabaseModule, ApiUploadDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
