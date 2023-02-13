import { Injectable } from '@nestjs/common';
const csv = require("csvtojson");
import * as XLSX from 'xlsx';
import {UploadDataEntry} from '../validation/upload-csv';

@Injectable()
export class ApiUploadDataService {

    async uploadCsv(body: UploadDataEntry){
        console.log('body', body);
        // const dataToLoad = await csv({ delimiter: ';' }).fromFile(body.name)
        // .then((response) => response)
        const dataToLoad = await XLSX.read(body.name, {type: 'file'});

        // console.log('dataToLoad', dataToLoad.Sheets.primary_data['!ref'].split(':'));
        //se obtiene el valor de los celdas de inicio y final
        const arrayFields = dataToLoad.Sheets.primary_data['!ref'].split(':');
        //se separan dichas celdas para obtener los valores por separado
        const startField = arrayFields.shift();
        const startLetter = startField[0];
        const startNumber = Number(startField.replace(startLetter, ''));
        const endLetter = arrayFields[0][0];
        const endNumber = Number(arrayFields[0].replace(endLetter, ''))
        
        //obtener los valores de cada una de las celdas (columna)
        for (let index = startNumber+1; index <= endNumber; index++) {
            console.log(`${startLetter}${index}`, dataToLoad.Sheets.primary_data[`${startLetter}${index}`]);
            console.log('valor', String.fromCharCode(64));
            
        }
        return true
    }
}
