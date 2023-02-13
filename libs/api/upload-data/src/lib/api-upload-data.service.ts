import { Injectable } from '@nestjs/common';
const csv = require('csvtojson');
import * as XLSX from 'xlsx';
import { UploadDataEntry } from '../validation/upload-csv';

@Injectable()
export class ApiUploadDataService {
    /**
     * @method uploadCsv
     * Servicio para carga de archivos csv 
     * @param body 
     * @returns 
     */
  async uploadCsv(body: UploadDataEntry) {
    const dataToLoad = await csv({ delimiter: ';' }).fromFile(body.name)
    .then((response) => response)
    
    return dataToLoad;
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
    const objectKeys = []
    const response = []
    //obtener los valores de cada una de las celdas (columna)
    for (let index = startNumber; index <= endNumber; index++) {
        const object = {}
        for (
          let letters = Number(startLetter.charCodeAt(0)), count = 0;
          letters <= Number(endLetter.charCodeAt(0));
          letters++, count++
        ) {
            const field = dataToLoad.Sheets.primary_data[`${String.fromCharCode(letters)}${index}`];
            
            if(index === 1)
                objectKeys.push(field.v)
            else{
                const value = field !== undefined? field.v : '-'
                object[objectKeys[count]] = value
            }
        }
        if(index > 1)
            response.push(object)
    }
    return response;
  }
}
