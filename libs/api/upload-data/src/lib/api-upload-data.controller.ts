import { Controller, Get, Query, Res, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiUploadDataService } from './api-upload-data.service';
import { Response } from 'express';

@Controller()
@ApiTags('AcademicLevels-By-SchoolYear-v2')
export class ApiUploadDataController {
  constructor(private apiUploadDataService: ApiUploadDataService) {}

  @Get(URLS.academicDegreeSectionByYear)
  async findAllDegreeSectionByYear(@Query() query, @Res() res: Response, @Headers() headers) {
    await this.apiUploadDataService
      .withDegreeSectionByYear()
      .then((result) => {
        res.status(200).send(true);
      })
      .catch((error) => {
        res.status(404).send(true);
      });
  }
}
