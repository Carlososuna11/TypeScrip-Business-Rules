import { DataSource } from 'typeorm';
import { UploadData } from '../entity/upload-data.entity';

export const photoProviders = [
  {
    provide: 'UPLOAD_DATA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UploadData),
    inject: ['DATA_SOURCE'],
  },
];