import fs from 'fs';
import path from 'path';
import { duration } from 'moment';
import { RaceLap } from './../interfaces/raceLap';

/**
 * @class
 *
 * Read a file and parse to a object array structure
 */
export class DataReader {
    /**
	 * Get the formatted data Race
	 * @param getRaceData
	 */
    public getRaceData(): RaceLap[] {
        const fileName = path.join(path.dirname(__dirname), '../logs', 'raceLog.txt');

        const raceData = new DataReader().getDataLines(fileName, 'utf-8');

        return raceData;
    }

    /**
	 * Get data lines values
	 * @param getDataLines
	 */
    private getDataLines(fileName: string, encoding: string): RaceLap[] {
        const file = this.readDataFromFile(fileName, encoding);
        const lines = this.parseFile(file);

        return lines;
    }

    /**
	 * Read the data from a file
	 * @param readDataFromFile
	 */
    private readDataFromFile(fileName: string, encoding: string): string {
        return fs.readFileSync(fileName, encoding);
    }

    /**
	 * Parse the data file to an object array
	 * @param parseFile
	 */
    private parseFile(file: string): RaceLap[] {
        const lines: RaceLap[] = file
            .split(/\r?\n/)
            .map(line => line.match(new RegExp('[^\\s*]*[^\\s*]', 'g')) as string[])
            .reduce((acc: RaceLap[], line: string[]) => {

                if (!line || line[3] === "Volta") { return acc; }

                const lapLog: RaceLap = {
                    logHour: duration(line[0]),
                    pilotNumber: line[1],
                    pilotName: line[3],
                    lapNumber: Number(line[4]),
                    lapTime: duration(`0:${line[5]}`),
                    lapAverageVelocity: Number(line[6].replace(',', '.')),
                };

                return [...acc, lapLog];

            }, [] as RaceLap[]);

        return lines;
    }

}