import { Test } from '@nestjs/testing';
import { ApiProjectsController } from './api-projects.controller';
import { ApiProjectsService } from './api-projects.service';

describe('ApiProjectsController', () => {
  let controller: ApiProjectsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiProjectsService],
      controllers: [ApiProjectsController],
    }).compile();

    controller = module.get(ApiProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
