"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataReader_1 = require("./services/dataReader");
const dataProcessor_1 = require("./services/dataProcessor");
const dataViewer_1 = require("./view/dataViewer");
const dataReader = new dataReader_1.DataReader();
const dataViewer = new dataViewer_1.DataViewer();
//Recebe informações da corrida formatadas em lista de objetos
const raceData = dataReader.getRaceData();
const dataProcessor = new dataProcessor_1.DataProcessor(raceData);
//Recebe melhores momentos da corrida e dos pilotos individualmente
const highLights = dataProcessor.getHighLights();
//Exibe resultado no console
dataViewer.viewResults(highLights);
//# sourceMappingURL=index.js.map