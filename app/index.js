"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataReader_1 = require("./services/dataReader");
const dataProcessor_1 = require("./services/dataProcessor");
const dataViewer_1 = require("./view/dataViewer");
const dataViewer = new dataViewer_1.DataViewer();
const dataReader = new dataReader_1.DataReader();
const raceData = dataReader.getRaceData();
const dataProcessor = new dataProcessor_1.DataProcessor(raceData);
const highLights = dataProcessor.getHighLights();
dataViewer.viewResults(highLights);
//# sourceMappingURL=index.js.map