import { URLS } from '@business-rules22/shared/urls';
import { Body, Controller, Post, Query, Res, Headers, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsValidation } from '../validation/projects.validation';
import { ProjectsService } from './api-projects.service';
import { Response } from 'express';
import { MESSAGES, ResponseService, STATUS } from '@business-rules22/shared/utils';

@Controller()
@ApiTags('Projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @Post(URLS.createProject)
  async createProject(@Body() body: ProjectsValidation, @Query() query, @Res() res: Response, @Headers() headers) {
    await this.ProjectsService.create(body)
    .then((result) => {
      const response = new ResponseService(STATUS.success, result, MESSAGES.success);
      res.status(STATUS.success).send(response);
    })
    .catch((error) => {
      const response = new ResponseService(STATUS[error], null, MESSAGES[error]);
      res.status(STATUS[error]).send(response);
    })
  }

  @Get(URLS.createProject)
  async getProjects(@Query() query, @Res() res: Response, @Headers() headers) {
    await this.ProjectsService.getAll()
    .then((result) => {
      const response = new ResponseService(STATUS.success, result, MESSAGES.success);
      res.status(STATUS.success).send(response);
    })
    .catch((error) => {
      const response = new ResponseService(STATUS[error], null, MESSAGES[error]);
      res.status(STATUS[error]).send(response);
    })
  }

  @Get(URLS.getUniqueProject)
  async getUniqueProject(@Param('id') id: string, @Res() res: Response, @Headers() headers) {
    await this.ProjectsService.getOne(id)
    .then((result) => {
      const response = new ResponseService(STATUS.success, result, MESSAGES.success);
      res.status(STATUS.success).send(response);
    })
    .catch((error) => {
      const response = new ResponseService(STATUS[error], null, MESSAGES[error]);
      res.status(STATUS[error]).send(response);
    })
  }

  @Put(URLS.getUniqueProject)
  async updateProject(@Param('id') id: string,@Body() body: ProjectsValidation, @Query() query, @Res() res: Response, @Headers() headers) {
    await this.ProjectsService.updateProject(id, body)
    .then((result) => {
      const response = new ResponseService(STATUS.success, result, MESSAGES.success);
      res.status(STATUS.success).send(response);
    })
    .catch((error) => {
      const response = new ResponseService(STATUS[error], null, MESSAGES[error]);
      res.status(STATUS[error]).send(response);
    })
  }
}
