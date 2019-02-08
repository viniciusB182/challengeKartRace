
import { DataReader } from './services/dataReader';
import { DataProcessor } from './services/dataProcessor';
import { DataViewer } from './view/dataViewer';

const dataReader = new DataReader();
const dataViewer = new DataViewer();

//Recebe informações da corrida formatadas em lista de objetos
const raceData = dataReader.getRaceData();

const dataProcessor = new DataProcessor(raceData);

//Recebe melhores momentos da corrida e dos pilotos individualmente
const highLights = dataProcessor.getHighLights();

//Exibe resultado no console
dataViewer.viewResults(highLights);