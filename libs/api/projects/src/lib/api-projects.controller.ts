import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './api-projects.service';

@Controller()
@ApiTags('Projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}
}
