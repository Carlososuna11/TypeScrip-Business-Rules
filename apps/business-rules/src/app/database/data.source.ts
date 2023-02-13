import { DataSource } from 'typeorm';
import dataSourceOptions from './typeorm.config';

const dataSource: DataSource = new DataSource(dataSourceOptions);

export default dataSource;
