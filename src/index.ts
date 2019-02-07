
import { DataReader } from './services/dataReader';
import { DataProcessor } from './services/dataProcessor';

const dataReader = new DataReader();

const raceData = dataReader.getRaceData();

const dataProcessor = new DataProcessor(raceData);

const highLights = dataProcessor.getHighLights();

console.log(highLights);