import { Module } from '@nestjs/common';
import { ApiUploadDataController } from './api-upload-data.controller';
import { ApiUploadDataService } from './api-upload-data.service';

@Module({
  controllers: [ApiUploadDataController],
  providers: [ApiUploadDataService],
  exports: [ApiUploadDataService],
})
export class ApiUploadDataModule {}
