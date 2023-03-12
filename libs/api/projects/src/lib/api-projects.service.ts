import { ApiUploadDataService } from '@business-rules22/api/upload-data';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from '../entity/projects.entity';
import { ProjectsUpdateStatusValidation, ProjectsValidation } from '../validation/projects.validation';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
    @Inject(forwardRef(() => ApiUploadDataService))
    public readonly apiUploadDataService: ApiUploadDataService,
  ) {}

  /**
   * @method create
   * Servicio para crear un proyecto 
   * @param body 
   * @returns 
   */
  async create(body: ProjectsValidation) {
    if(body.file){
      const value = body.file.includes('.csv') ? 
        await this.apiUploadDataService.uploadCsv({name: body.file}, `project${body.code}`)
        : await this.apiUploadDataService.uploadXlsx({name: body.file}, `project${body.code}`)
    }

    return await this.projectsRepository
      .query(`
      INSERT INTO projects (name, code, description, file, createdat, updatedat) VALUES (
        '${body.name}',
        '${body.code}',
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

  async getOne(id: string){
    return await this.projectsRepository.query(`
      SELECT * FROM projects
      WHERE id = ${id}
    `)
  }

  async updateProject(id: string, body: ProjectsValidation) {
    if(body.file){
      body.file.includes('.csv') ? 
        await this.apiUploadDataService.uploadCsv({name: body.file}, `project${body.code}`, false)
        : await this.apiUploadDataService.uploadXlsx({name: body.file}, `project${body.code}`, false)
    }

    return await this.projectsRepository
      .query(`
      UPDATE projects SET name= '${body.name}', description= '${body.description}', file= '${body.file}' WHERE id = ${id}`)
      .then(
        function (user) {
          console.log(user);
          return user;
        },
        function (err) {
          console.log(err);
        }
      );
  }

  async updateStatusProject(id: string, body: ProjectsUpdateStatusValidation) {
    return await this.projectsRepository
      .query(`
      UPDATE projects SET status= ${body.status} WHERE id = ${id}`)
      .then(
        function (user) {
          console.log(user);
          return user;
        },
        function (err) {
          console.log(err);
        }
      );
  }
}