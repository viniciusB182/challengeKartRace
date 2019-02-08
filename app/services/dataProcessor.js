"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = require("moment");
/**
 * @class
 *
 * Process a file into {@link DataProcessor} structure
 */
class DataProcessor {
    constructor(raceLaps) {
        this.raceLaps = raceLaps;
    }
    getHighLights() {
        const pilots = this.getAllPilots();
        const raceStartHour = this.getRaceStartHour();
        const pilotsHighLights = pilots.reduce((acc, pilot) => {
            const pilotRaceLaps = this.getPilotRaceLaps(pilot.pilotNumber, raceStartHour);
            const pilotbestLap = this.getPilotBestLap(pilotRaceLaps.raceLaps);
            const pilotRaceTotalTime = this.getPilotRaceTotalTime(pilotRaceLaps.raceLaps);
            const pilotVelocityAverage = this.getPilotRaceVelocityAverage(pilotRaceLaps.raceLaps);
            const hightLight = {
                pilotNumber: pilot.pilotNumber,
                pilotName: pilot.pilotName,
                bestLap: pilotbestLap,
                raceTotalTime: pilotRaceTotalTime,
                raceAverageVelocity: pilotVelocityAverage,
                totalNumberOfLaps: pilotRaceLaps.totalNumberOfLaps
            };
            return this.setPilotsTotalTimeAfterWinner(this.setRacePodium([...acc, hightLight]));
        }, []);
        const bestRaceLap = this.getRaceBestLap(pilotsHighLights);
        const raceHighLight = {
            podium: pilotsHighLights,
            bestRaceLap: bestRaceLap
        };
        return raceHighLight;
    }
    getRaceStartHour() {
        const firstLaps = this.raceLaps.filter(rl => rl.lapNumber === 1)
            .map(rl => rl.logHour.clone().subtract(rl.lapTime))
            .sort((a, b) => a.asMilliseconds() - b.asMilliseconds());
        return firstLaps[0];
    }
    getRaceBestLap(pilotsHighLights) {
        let bestRaceLap = {
            pilotName: "",
            lapTime: moment_1.duration(99999999)
        };
        pilotsHighLights.forEach(lap => {
            if (lap.bestLap < bestRaceLap.lapTime) {
                bestRaceLap.lapTime = lap.bestLap;
                bestRaceLap.pilotName = lap.pilotName;
            }
        });
        return bestRaceLap;
    }
    setRacePodium(pilotsHighLights) {
        return pilotsHighLights.sort((a, b) => a.raceTotalTime.asMilliseconds() - b.raceTotalTime.asMilliseconds());
    }
    setPilotsTotalTimeAfterWinner(pilotsHighLights) {
        pilotsHighLights.forEach(phl => {
            phl.arrivalPosition = pilotsHighLights.indexOf(phl) + 1;
            if (phl.totalNumberOfLaps === 4) {
                phl.timeAfterTheWinner = phl.raceTotalTime.clone().subtract(pilotsHighLights[0].raceTotalTime);
            }
        });
        return pilotsHighLights;
    }
    getPilotRaceTotalTime(pilotRaceLaps) {
        const totalTime = pilotRaceLaps.reduce((acc, prl) => {
            return moment_1.duration(acc).add(prl.lapTime);
        }, {});
        return totalTime;
    }
    getPilotRaceLaps(pilotNumber, raceStartHour) {
        const pilotRaceLaps = this.raceLaps.filter(rl => rl.pilotNumber === pilotNumber).sort(rl => rl.lapNumber);
        pilotRaceLaps.forEach(prl => {
            if (prl.lapNumber === 1) {
                const whenPassTheStartLine = prl.logHour.clone().subtract(prl.lapTime);
                const timeToPassTheStartLine = whenPassTheStartLine.clone().subtract(raceStartHour);
                prl.lapTime.subtract(timeToPassTheStartLine);
            }
        });
        return { raceLaps: pilotRaceLaps, totalNumberOfLaps: pilotRaceLaps.length };
    }
    getPilotBestLap(pilotRaceLaps) {
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
        return this.calculatePilotRaceVelocityAverage(velocityAverages);
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
    calculatePilotRaceVelocityAverage(velocityAverages) {
        const total = velocityAverages.reduce((acc, velocityAverage) => {
            return acc + velocityAverage;
        });
        const raceVelocityAverage = total / velocityAverages.length;
        return Number(raceVelocityAverage.toFixed(3));
    }
}
exports.DataProcessor = DataProcessor;
//# sourceMappingURL=dataProcessor.js.map