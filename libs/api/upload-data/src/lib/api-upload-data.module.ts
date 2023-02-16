import { DatabaseModule } from '@business-rules/api/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadData } from '../entity/upload-data.entity';
import { ApiUploadDataController } from './api-upload-data.controller';
import { uploadDataProviders } from './api-upload-data.providers';
import { ApiUploadDataService } from './api-upload-data.service';

@Module({
  // imports: [DatabaseModule],
  controllers: [ApiUploadDataController],
  // providers: [ApiUploadDataService, ...uploadDataProviders],
  providers: [ApiUploadDataService],
  exports: [ApiUploadDataService],
})
export class ApiUploadDataModule {}
