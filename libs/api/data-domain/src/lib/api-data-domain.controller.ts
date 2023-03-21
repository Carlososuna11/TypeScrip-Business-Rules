import { Controller } from '@nestjs/common';
import { ApiDataDomainService } from './api-data-domain.service';

@Controller('api-data-domain')
export class ApiDataDomainController {
  constructor(private apiDataDomainService: ApiDataDomainService) {}
}
