"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const moment_1 = require("moment");
/**
 * @class
 *
 * Parse a file into {@link DataReader} structure
 */
class DataReader {
    getRaceData() {
        const fileName = path_1.default.join(path_1.default.dirname(__dirname), '../logs', 'raceLog.txt');
        const raceData = new DataReader().parse(fileName, 'utf-8');
        return raceData;
    }
    parse(fileName, encoding) {
        const file = this.readDataFromFile(fileName, encoding);
        const lines = this.parseFile(file);
        return lines;
    }
    readDataFromFile(fileName, encoding) {
        return fs_1.default.readFileSync(fileName, encoding);
    }
    parseFile(file) {
        const lines = file
            .split(/\r?\n/)
            .map(line => line.match(new RegExp('[^\\s*]*[^\\s*]', 'g')))
            .reduce((acc, line) => {
            if (!line || line[3] === "Volta") {
                return acc;
            }
            const lapLog = {
                logHour: moment_1.duration(line[0]),
                pilotNumber: line[1],
                pilotName: line[3],
                lapNumber: Number(line[4]),
                lapTime: moment_1.duration(`0:${line[5]}`),
                lapAverageVelocity: Number(line[6].replace(',', '.')),
            };
            return [...acc, lapLog];
        }, []);
        return lines;
    }
}
exports.DataReader = DataReader;
//# sourceMappingURL=dataReader.js.map