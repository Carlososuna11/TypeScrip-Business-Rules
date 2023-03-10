import { URLS } from '@business-rules22/shared/urls';
import { Body, Controller, Post, Query, Res, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsValidation } from '../validation/projects.validation';
import { ProjectsService } from './api-projects.service';
import { Response } from 'express';

@Controller()
@ApiTags('Projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @Post(URLS.createProject)
  async createProject(@Body() body: ProjectsValidation, @Query() query, @Res() res: Response, @Headers() headers) {
    await this.ProjectsService.create(body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
}
