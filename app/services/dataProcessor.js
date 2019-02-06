"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = require("moment");
/**
 * @class
 *
 * Parse a file into {@link DataProcessor} structure
 */
class DataProcessor {
    constructor(raceLaps) {
        this.raceLaps = raceLaps;
    }
    getHighLights() {
        const pilots = this.getAllPilots();
        const pilotsHighLights = pilots.reduce((acc, pilot) => {
            const pilotRaceLaps = this.raceLaps.filter(rl => rl.pilotNumber === pilot.pilotNumber);
            const bestLap = this.getBestPilotLap(pilotRaceLaps);
            const raceVelocityAverage = this.getPilotRaceVelocityAverage(pilotRaceLaps);
            const hightLight = {
                pilotNumber: pilot.pilotNumber,
                pilotName: pilot.pilotName,
                bestLap: bestLap,
                raceAverageVelocity: raceVelocityAverage,
                timeAfterTheWinner: moment_1.duration(99999999)
            };
            return [...acc, hightLight];
        }, []);
        console.log(pilotsHighLights);
    }
    getAllPilots() {
        const pilots = this.raceLaps.reduce((acc, raceLap) => {
            const pilot = {
                pilotName: raceLap.pilotName,
                pilotNumber: raceLap.pilotNumber
            };
            if (acc.filter(p => p.pilotNumber === pilot.pilotNumber).length) {
                return acc;
            }
            ;
            return [...acc, pilot];
        }, []);
        return pilots;
    }
    getBestPilotLap(pilotRaceLaps) {
        let bestLapTime = moment_1.duration(99999999);
        pilotRaceLaps.forEach(lap => {
            if (lap.lapTime < bestLapTime) {
                bestLapTime = lap.lapTime;
            }
        });
        return bestLapTime;
    }
    getPilotRaceVelocityAverage(pilotRaceLaps) {
        const velocityAverages = pilotRaceLaps.reduce((acc, pilotRaceLap) => {
            return [...acc, pilotRaceLap.lapAverageVelocity];
        }, []);
        return this.calculateRaceVelocityAverage(velocityAverages);
    }
    calculateRaceVelocityAverage(velocityAverages) {
        const total = velocityAverages.reduce((acc, velocityAverage) => {
            return acc + velocityAverage;
        });
        const raceVelocityAverage = total / velocityAverages.length;
        return Number(raceVelocityAverage.toFixed(3));
    }
}
exports.DataProcessor = DataProcessor;
//# sourceMappingURL=dataProcessor.js.map