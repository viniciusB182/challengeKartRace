
import { DataReader } from './services/dataReader';
import { DataProcessor } from './services/dataProcessor';
import { DataViewer } from './view/dataViewer';

const dataViewer = new DataViewer();
const dataReader = new DataReader();

const raceData = dataReader.getRaceData();

const dataProcessor = new DataProcessor(raceData);

const highLights = dataProcessor.getHighLights();

dataViewer.viewResults(highLights);