import { ApiUploadDataModule } from '@business-rules/api/upload-data';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiUploadDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
