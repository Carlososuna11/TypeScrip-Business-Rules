import { ProjectsService } from '@business-rules22/business-rules2/src/projects';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import fs = require('fs');
import readline = require('readline');
import { DataDomainValidation } from '../validation/dataDomainValidation';

@Injectable()
export class ApiDataDomainService {
  constructor(
    @Inject(forwardRef(() => ProjectsService))
    public readonly apiProjectsService: ProjectsService
  ) {}

  /**
   * @method listJsonSchema
   * Servicio para obtener el jsonSchema
   * @param id
   * @returns
   */
  async listJsonSchema(id) {
    const dataFile = fs.readFileSync(`./tsbr/projects${id}.tsbr`, {
      encoding: 'utf8',
      flag: 'r',
    });

    let dataTranscription = '';
    for (let index = 0; index < dataFile.length; index++) {
      if (dataFile[index] !== ']') dataTranscription += dataFile[index];
      else {
        dataTranscription += ']';
        break;
      }
    }

    return JSON.parse(dataTranscription.replace('const jsonSchema = ', ''));
  }

  async updateJsonSchema(body: DataDomainValidation) {
    let data = 'const jsonSchema = ';
    data += JSON.stringify(body.data);

    fs.unlink(`./tsbr/projects${body.code}.tsbr`, (err) => {
      if (err) console.log(err);
      else console.log('\nDeleted file');
    });

    fs.writeFile(
      `./tsbr/projects${body.code}.tsbr`,
      data,
      { encoding: 'utf-8', mode: 0o666, flag: 'a' },
      (err) => {
        if (err) throw err;
        console.log('Archivo actualizado Satisfactoriamente');
      }
    );
  }
}
