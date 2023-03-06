import { Test } from '@nestjs/testing';
import { ApiProjectsService } from './api-projects.service';

describe('ApiProjectsService', () => {
  let service: ApiProjectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiProjectsService],
    }).compile();

    service = module.get(ApiProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
