import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/upload.entity';
const csv = require('csvtojson');
import * as XLSX from 'xlsx';
import { UploadDataEntry } from '../validation/upload-csv';

@Injectable()
export class ApiUploadDataService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {}

  async findAll() {
    // return 'hola'
    // return await this.postRepository.query('CREATE TABLE post ( id integer)')
    // const post =  await this.postRepository.query('INSERT INTO post (id) VALUES (2)')
  }

  /**
   * @method uploadCsv
   * Servicio para carga de archivos csv
   * @param body
   * @returns
   */
  async uploadCsv(body: UploadDataEntry) {
    const dataToLoad = await csv({ delimiter: ';' })
      .fromFile(body.name)
      .then((response) => response);
    const queryCrateTable = await this.createDynamicTable(dataToLoad);
    const { insert, data } = await this.createDynamicQueryInsert(dataToLoad);
    //borramos la tabla con los datos anteriores
    await this.postRepository.query(`DROP TABLE post `)
    // //creamos la tabla nueva
    await this.postRepository.query(`CREATE TABLE post (${queryCrateTable})`)

    return await this.postRepository.query(`INSERT INTO post (${insert}) VALUES ${data}`)
  }

  /**
   * @method uploadXlsx
   * Servicio para la carga de archivos xlsx (Excel)
   * @param body
   * @returns
   */
  async uploadXlsx(body: UploadDataEntry) {
    const dataToLoad = await XLSX.read(body.name, { type: 'file' });

    // console.log('dataToLoad', dataToLoad.Sheets.primary_data['!ref'].split(':'));
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
    
    const queryCrateTable = await this.createDynamicTable(response);
    
    const { insert, data } = await this.createDynamicQueryInsert(response);
    //borramos la tabla con los datos anteriores
    // await this.postRepository.query(`DROP TABLE post2 `)
    //creamos la tabla nueva
    await this.postRepository.query(`CREATE TABLE post2 (${queryCrateTable})`)

    await this.postRepository.query(`INSERT INTO post2 (${insert}) VALUES ${data}`)
    return `INSERT INTO post2 (${insert}) VALUES ${data}`;
  }

  private async createDynamicTable(dataToLoad) {
    const keys = Object.keys(dataToLoad.shift());
    const query = ['id integer'];

    for (const iterator of keys) {
      query.push(`${iterator.replace(/-/g, '_')} character varying(255)`);
    }
    return query.toString();
  }

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
            ? `'${element[key].replace("'", "")}'`
            : `'${element[key].replace("'", "")}',`;
      }
      dataValues += count === values.length ? ')' : '),';
    }

    return { insert: query.toString(), data: dataValues.toString() };
  }
}
