import { Body, Controller, Get, Post, Query, Res, Headers } from '@nestjs/common';
import { UploadDataEntry } from '../validation/upload-csv';
import { ApiUploadDataService } from './api-upload-data.service';
import { Response } from 'express';
import { URLS } from '@business-rules22/shared/urls';

@Controller('api-upload-data')
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
