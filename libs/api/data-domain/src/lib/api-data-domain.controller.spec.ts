import { Test } from '@nestjs/testing';
import { ApiDataDomainController } from './api-data-domain.controller';
import { ApiDataDomainService } from './api-data-domain.service';

describe('ApiDataDomainController', () => {
  let controller: ApiDataDomainController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiDataDomainService],
      controllers: [ApiDataDomainController],
    }).compile();

    controller = module.get(ApiDataDomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
