import path from 'path';
import { DataReader } from './services/dataReader';

const fileName = path.join(path.dirname(__dirname), 'logs', 'raceLog.txt');

const raceData = new DataReader().parse(fileName, 'utf-8');

console.log(raceData);