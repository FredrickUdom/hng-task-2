import {  DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { environment } from './environment';
 
config();
 
export const dataSourceOptions: DataSourceOptions=({
  type: environment.DATABASE.TYPE,
  host: environment.DATABASE.HOST,
  port: environment.DATABASE.PORT,
  username: environment.DATABASE.USERNAME,
  password: environment.DATABASE.PASSWORD,
  database: environment.DATABASE.NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/config/migrations/*.js'],
  synchronize:true
});
const dataSourceConfig = new DataSource(dataSourceOptions)
export default dataSourceConfig;