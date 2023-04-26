import { Test } from '@nestjs/testing';
import { ApiDataDomainService } from './api-data-domain.service';

describe('ApiDataDomainService', () => {
  let service: ApiDataDomainService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDataDomainService],
    }).compile();

    service = module.get(ApiDataDomainService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
