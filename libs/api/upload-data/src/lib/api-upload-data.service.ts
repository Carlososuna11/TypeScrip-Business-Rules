/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entity/upload.entity';
const csv = require('csvtojson');
const fs = require('fs');
import * as XLSX from 'xlsx';
import { UploadDataEntry } from '../validation/upload-csv';
import {
  JsonSchemaDto,
  optionsDto,
  typesDto,
} from '@business-rules22/shared/dto';
@Injectable()
export class ApiUploadDataService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  /**
   * @method uploadCsv
   * Servicio para carga de archivos csv
   * @param body
   * @param nameTable
   * @param isCreate
   * @returns
   */
  async uploadCsv(body: UploadDataEntry, nameTable = '', isCreate = true) {
    nameTable = `projects${body.codeProject}`;
    const dataToLoad = await csv({ delimiter: ';' })
      .fromFile(body.name)
      .then((response) => response);
    const { queryCrateTable, columns } = await this.createDynamicTable(
      dataToLoad
    );
    const dataTSBR = `const jsonSchema = ${JSON.stringify(columns)}`;
    //Creación de archivo tsbr
    fs.writeFile(`./tsbr/${nameTable}.tsbr`, dataTSBR, (error) => {
      if (error) console.log(error);
      else console.log('El archivo fue creado');
    });

    const { insert, data } = await this.createDynamicQueryInsert(dataToLoad);
    //borramos la tabla con los datos anteriores
    if (isCreate === false)
      await this.postRepository.query(`DROP TABLE ${nameTable}`);
    // //creamos la tabla nueva
    await this.postRepository.query(
      `CREATE TABLE ${nameTable} (${queryCrateTable})`
    );

    return await this.postRepository.query(
      `INSERT INTO ${nameTable} (${insert}) VALUES ${data}`
    );
  }

  /**
   * @method uploadXlsx
   * Servicio para la carga de archivos xlsx (Excel)
   * @param body
   * @param nameTable
   * @param isCreate
   * @returns
   */
  async uploadXlsx(body: UploadDataEntry, nameTable = '', isCreate = true) {
    nameTable = `projects${body.codeProject}`;
    const dataToLoad = await XLSX.read(body.name, { type: 'file' });

    //se obtiene el valor de los celdas de inicio y final
    const arrayFields = dataToLoad.Sheets.primary_data['!ref'].split(':');
    //se separan dichas celdas para obtener los valores por separado
    const startField = arrayFields.shift();
    const startLetter = startField[0];
    const startNumber = Number(startField.replace(startLetter, ''));
    //letra final
    const endLetter = arrayFields[0][0];
    const endNumber = Number(arrayFields[0].replace(endLetter, ''));
    const objectKeys = [];
    const response = [];

    //obtener los valores de cada una de las celdas (columna)
    for (let index = startNumber; index <= endNumber; index++) {
      const object = {};

      for (
        let letters = Number(startLetter.charCodeAt(0)), count = 0;
        letters <= Number(endLetter.charCodeAt(0));
        letters++, count++
      ) {
        const field =
          dataToLoad.Sheets.primary_data[
            `${String.fromCharCode(letters)}${index}`
          ];

        if (index === 1) objectKeys.push(field.v);
        else {
          const value = field !== undefined ? field.v : '-';
          object[objectKeys[count]] = value;
        }
      }
      if (index > 1) response.push(object);
    }

    const { queryCrateTable, columns } = await this.createDynamicTable(
      response
    );
    const dataTSBR = `const jsonSchema = ${JSON.stringify(columns)}`;
    //Creación de archivo tsbr
    fs.writeFile(`./tsbr/${nameTable}.tsbr`, dataTSBR, (error) => {
      if (error) console.log(error);
      else console.log('El archivo fue creado');
    });
    const { insert, data } = await this.createDynamicQueryInsert(response);
    //borramos la tabla con los datos anteriores
    if (isCreate === false)
      await this.postRepository.query(`DROP TABLE ${nameTable} `);
    //creamos la tabla nueva
    await this.postRepository.query(
      `CREATE TABLE ${nameTable} (${queryCrateTable})`
    );

    return await this.postRepository.query(
      `INSERT INTO ${nameTable} (${insert}) VALUES ${data}`
    );
  }

  /**
   * @method createDynamicTable
   * Servicio para generar el create de las tablas de forma dinamica
   * @param dataToLoad
   * @returns
   */
  private async createDynamicTable(dataToLoad) {
    const content = dataToLoad[0];
    const regexString = /^[A-Za-z0-9,.-;:"{}*-\s]+$/;
    const regexArray = /[[\]\s]+$/;
    const keys = Object.keys(dataToLoad.shift());
    const query = ['id integer'];
    const columns = [
      {
        name: 'id',
        type: {
          datatype: 'integer',
          width: 11,
        },
        tag: '',
        description: '',
        value: '',
        isActive: true,
        options: {
          nullable: false,
          autoincrement: true,
        },
      },
    ];

    for (const iterator of keys) {
      const dataJsonSchema: JsonSchemaDto = new JsonSchemaDto();
      const optionsData = new optionsDto();
      const typesData = new typesDto();
      const word = iterator.replace(/-/g, '_');

      dataJsonSchema.name = word;
      dataJsonSchema.isActive = true;
      dataJsonSchema.description = '';
      dataJsonSchema.tag = '';
      dataJsonSchema.value = '';
      optionsData.nullable = false;
      optionsData.autoincrement = false;
      dataJsonSchema.options = optionsData;

      if (content[iterator] === undefined) {
        query.push(`${word} character varying(255)`);
        typesData.datatype = 'character varying';
        typesData.width = 255;
      } else {
        if (typeof content[iterator] === 'number') {
          query.push(`${word} integer(${word.length})`);
          typesData.datatype = 'integer';
          typesData.width = word.length;
        } else if (
          regexArray.test(content[iterator]) &&
          content[iterator][0] === '['
        ) {
          query.push(`${word} text`);
          typesData.datatype = 'text';
        } else if (regexString.test(content[iterator])) {
          query.push(`${word} character varying(255)`);
          typesData.datatype = 'character varying';
          typesData.width = 255;
        }
      }

      dataJsonSchema.type = typesData;
      columns.push(dataJsonSchema);
    }

    return { queryCrateTable: query.toString(), columns };
  }

  /**
   * @method createDynamicQueryInsert
   * Servicio para generar el insert into de las tablas de forma dinamica
   * @param dataToLoad
   * @returns
   */
  private async createDynamicQueryInsert(dataToLoad) {
    const keys = Object.keys(dataToLoad.shift());
    const values = Object.values(dataToLoad);
    const query = ['id'];
    let dataValues = '';
    let count = 0;

    for (const iterator of keys) {
      query.push(`${iterator.replace(/-/g, '_')}`);
    }

    for (const iterator of values) {
      count++;
      dataValues += `(${count},`;
      for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const element = iterator;
        dataValues +=
          element[key] === ''
            ? `'-',`
            : index === keys.length - 1
            ? `'${element[key].replace("'", '')}'`
            : `'${element[key].replace("'", '')}',`;
      }
      dataValues += count === values.length ? ')' : '),';
    }

    return { insert: query.toString(), data: dataValues.toString() };
  }
}
