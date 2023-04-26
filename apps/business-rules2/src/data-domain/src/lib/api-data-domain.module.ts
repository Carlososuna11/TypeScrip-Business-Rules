import { Module, forwardRef } from '@nestjs/common';
import { ApiDataDomainController } from './api-data-domain.controller';
import { ApiDataDomainService } from './api-data-domain.service';
import { ApiProjectsModule } from '@business-rules22/business-rules2/src/projects';

@Module({
  imports:[
    forwardRef(() => ApiProjectsModule)
  ],
  controllers: [ApiDataDomainController],
  providers: [ApiDataDomainService],
  exports: [ApiDataDomainService],
})
export class ApiDataDomainModule {}
