"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataReader_1 = require("./services/dataReader");
const dataProcessor_1 = require("./services/dataProcessor");
const dataReader = new dataReader_1.DataReader();
const raceData = dataReader.getRaceData();
const dataProcessor = new dataProcessor_1.DataProcessor(raceData);
const highLights = dataProcessor.getHighLights();
console.log(highLights);
//# sourceMappingURL=index.js.map