import { Injectable } from '@nestjs/common';
import * as csv from 'csvtojson';
import {UploadDataEntry} from '../validation/upload-csv';

@Injectable()
export class ApiUploadDataService {

    async uploadCsv(body: UploadDataEntry){
        console.log('body', body);
        const dataToLoad = await csv().fromFile(body.name)
        .then((jsonObj)=>{
            console.log(jsonObj)
        })
        
        console.log('dataToLoad', dataToLoad);
        return true
    }
}
