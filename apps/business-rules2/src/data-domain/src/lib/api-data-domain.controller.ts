import { Controller, Get, Param, Res, Headers, Body, Post } from '@nestjs/common';
import { ApiDataDomainService } from './api-data-domain.service';
import { ApiTags } from '@nestjs/swagger';
import { URLS } from '@business-rules22/shared/urls';
import { ResponseService, STATUS, MESSAGES } from '@business-rules22/shared/utils';
import { Response } from 'express';
import { DataDomainValidation } from '../validation/dataDomainValidation';

@Controller()
@ApiTags('Data-Domain')
export class ApiDataDomainController {
  constructor(private apiDataDomainService: ApiDataDomainService) {}

  @Get(URLS.listDataDomain)
  async listDataDomain(@Param('id') id: string, @Res() res: Response, @Headers() headers) {
    await this.apiDataDomainService.listJsonSchema(id)
    .then((result) => {
      const response = new ResponseService(STATUS.success, result, MESSAGES.success);
      res.status(STATUS.success).send(response);
    })
    .catch((error) => {
      const response = new ResponseService(STATUS[error], null, MESSAGES[error]);
      res.status(STATUS[error]).send(response);
    })
  }

  @Post(URLS.updateDataDomain)
  async updateDataDomain(@Body() body: DataDomainValidation, @Res() res: Response, @Headers() headers) {
    await this.apiDataDomainService.updateJsonSchema(body)
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
