import path from 'path';
import { DataReader } from './services/dataReader';
import { DataProcessor } from './services/dataProcessor';

const fileName = path.join(path.dirname(__dirname), 'logs', 'raceLog.txt');

const raceData = new DataReader().parse(fileName, 'utf-8');

const dataProcessor = new DataProcessor(raceData);

dataProcessor.getHighLights();