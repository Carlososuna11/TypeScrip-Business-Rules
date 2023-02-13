import { Test } from '@nestjs/testing';
import { ApiUploadDataService } from './api-upload-data.service';

describe('ApiUploadDataService', () => {
  let service: ApiUploadDataService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUploadDataService],
    }).compile();

    service = module.get(ApiUploadDataService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
