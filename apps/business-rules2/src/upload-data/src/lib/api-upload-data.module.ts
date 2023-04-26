import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiUploadDataController } from './api-upload-data.controller';
import { ApiUploadDataService } from './api-upload-data.service';
import { Post } from '../entity/upload.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post])
  ],
  controllers: [ApiUploadDataController],
  providers: [ApiUploadDataService],
  exports: [ApiUploadDataService],
})
export class ApiUploadDataModule {}
