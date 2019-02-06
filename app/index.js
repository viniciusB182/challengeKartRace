"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dataReader_1 = require("./services/dataReader");
const dataProcessor_1 = require("./services/dataProcessor");
const fileName = path_1.default.join(path_1.default.dirname(__dirname), 'logs', 'raceLog.txt');
const raceData = new dataReader_1.DataReader().parse(fileName, 'utf-8');
const dataProcessor = new dataProcessor_1.DataProcessor(raceData);
dataProcessor.getHighLights();
//# sourceMappingURL=index.js.map