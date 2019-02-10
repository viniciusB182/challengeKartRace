"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = require("moment");
/**
 * @class
 *
 * Process informations of a file
 */
class DataProcessor {
    constructor(raceLaps) {
        this.raceLaps = raceLaps;
    }
    /**
     * Get the race and pilots highLights
     * @param getHighLights
     */
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
    /**
     * Get the hour of when the race started
     * @param getRaceStartHour
     */
    getRaceStartHour() {
        const firstLaps = this.raceLaps.filter(rl => rl.lapNumber === 1)
            .map(rl => rl.logHour.clone().subtract(rl.lapTime))
            .sort((a, b) => a.asMilliseconds() - b.asMilliseconds());
        return firstLaps[0];
    }
    /**
     * Get all laps from an specific pilot
     * Calculate de real value of the first lap subtracting the time to pass the starting line
     * @param getPilotRaceLaps
     */
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
    /**
     * Get the best lap from an specific pilot
     * @param getPilotBestLap
     */
    getPilotBestLap(pilotRaceLaps) {
        let bestLapTime = moment_1.duration(99999999);
        pilotRaceLaps.forEach(lap => {
            if (lap.lapTime < bestLapTime) {
                bestLapTime = lap.lapTime;
            }
        });
        return bestLapTime;
    }
    /**
     * Get the race velocity average from an specific pilot
     * @param getPilotRaceVelocityAverage
     */
    getPilotRaceVelocityAverage(pilotRaceLaps) {
        const velocityAverages = pilotRaceLaps.reduce((acc, pilotRaceLap) => {
            return [...acc, pilotRaceLap.lapAverageVelocity];
        }, []);
        return this.calculatePilotRaceVelocityAverage(velocityAverages);
    }
    /**
     * Get the sum of the time from all laps from an specific pilot
     * @param getPilotRaceTotalTime
     */
    getPilotRaceTotalTime(pilotRaceLaps) {
        const totalTime = pilotRaceLaps.reduce((acc, prl) => {
            return moment_1.duration(acc).add(prl.lapTime);
        }, {});
        return totalTime;
    }
    /**
     * Set the pilots total time to pass the finishing line after the Winner
     * @param setPilotsTotalTimeAfterWinner
     */
    setPilotsTotalTimeAfterWinner(pilotsHighLights) {
        pilotsHighLights.forEach(phl => {
            phl.arrivalPosition = pilotsHighLights.indexOf(phl) + 1;
            if (phl.totalNumberOfLaps === 4) {
                phl.timeAfterTheWinner = phl.raceTotalTime.clone().subtract(pilotsHighLights[0].raceTotalTime);
            }
        });
        return pilotsHighLights;
    }
    /**
     * Get the lap with the best time from of all pilots
     * @param getRaceBestLap
     */
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
    /**
     * Set the pilots highlights by arrival order
     * @param setRacePodium
     */
    setRacePodium(pilotsHighLights) {
        //Separa entre os que completaram e os que não completarama prova
        const notCompletedTheRace = pilotsHighLights.filter(phl => phl.totalNumberOfLaps < 4);
        const completedTheRace = pilotsHighLights.filter(phl => phl.totalNumberOfLaps === 4);
        //Ordena os que terminaram a corrida por tempo total de prova
        completedTheRace.sort((a, b) => a.raceTotalTime.asMilliseconds() - b.raceTotalTime.asMilliseconds());
        //Insere os que não terminaram a prova no final, não os ordenando
        return completedTheRace.concat(notCompletedTheRace);
    }
    /**
     * Get all pilots names and number
     * @param getAllPilots
     */
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
    /**
     * Calculate the pilot race velocity average
     * @param getAllPilots
     */
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