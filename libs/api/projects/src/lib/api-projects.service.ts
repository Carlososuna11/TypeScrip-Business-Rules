import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from '../entity/projects.entity';
import { ProjectsValidation } from '../validation/projects.validation';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>
  ) {}

  /**
   * @method create
   * Servicio para crear un proyecto 
   * @param body 
   * @returns 
   */
  async create(body: ProjectsValidation) {
    return await this.projectsRepository
      .query(`
      INSERT INTO projects (name, description, file, createdat, updatedat) VALUES (
        '${body.name}',
        '${body.description}',
        '${body.file}',
        '${new Date().toLocaleDateString()}',
        '${new Date().toLocaleDateString()}'
      )`)
      .then(
        function (user) {
          console.log(user);
          return user;
        },
        function (err) {
          console.log(err);
        }
      );

    // return await this.projectsRepository.createQueryBuilder()
    // .insert()
    // .into(Projects)
    // .values({
    //     name: body.name,
    //     description: body.description,
    //     file: body.file,
    //     createdAt: new Date().toLocaleDateString(),
    //     updatedAt: new Date().toLocaleDateString()
    // })
    // .execute()
    //   .then((res) => {
    //     console.log('res', res);
    //     return res
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //     return err
    //   });
  }

  async getAll(){
    return await this.projectsRepository.query(`
      SELECT * FROM projects
    `)
  }
}