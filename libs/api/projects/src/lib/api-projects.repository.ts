
import { ProjectsDto } from '@business-rules22/shared/dto';
import { EntityRepository, Repository } from 'typeorm';
import { Projects } from '../entity/projects.entity';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
  createDog = async (projectsDto: ProjectsDto) => {
    return await this.save(projectsDto);
  };
}