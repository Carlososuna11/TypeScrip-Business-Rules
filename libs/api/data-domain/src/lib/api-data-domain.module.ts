import { Module } from '@nestjs/common';
import { ApiDataDomainController } from './api-data-domain.controller';
import { ApiDataDomainService } from './api-data-domain.service';

@Module({
  controllers: [ApiDataDomainController],
  providers: [ApiDataDomainService],
  exports: [ApiDataDomainService],
})
export class ApiDataDomainModule {}
