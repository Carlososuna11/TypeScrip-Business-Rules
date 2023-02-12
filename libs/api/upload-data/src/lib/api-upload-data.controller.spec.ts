import { Test } from '@nestjs/testing';
import { ApiUploadDataController } from './api-upload-data.controller';
import { ApiUploadDataService } from './api-upload-data.service';

describe('ApiUploadDataController', () => {
  let controller: ApiUploadDataController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUploadDataService],
      controllers: [ApiUploadDataController],
    }).compile();

    controller = module.get(ApiUploadDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
