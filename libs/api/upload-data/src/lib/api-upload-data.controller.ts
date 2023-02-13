import { Controller, Get, Query, Res, Headers, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiUploadDataService } from './api-upload-data.service';
import { Response } from 'express';
import { UploadDataEntry } from '../validation/upload-csv';
import { URLS } from '@business-rules/shared/urls';

@Controller()
@ApiTags('Upload-data')
export class ApiUploadDataController {
  constructor(private apiUploadDataService: ApiUploadDataService) {}

  @Post(URLS.uploadCsv)
  async uploadCsv(@Body() body: UploadDataEntry, @Query() query, @Res() res: Response, @Headers() headers) {
    await this.apiUploadDataService.uploadCsv(body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(200).send(true);
      });
  }

  @Post(URLS.uploadExcel)
  async uploadExcel(@Body() body: UploadDataEntry, @Query() query, @Res() res: Response, @Headers() headers) {
    await this.apiUploadDataService.uploadXlsx(body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(200).send(true);
      });
  }
}
