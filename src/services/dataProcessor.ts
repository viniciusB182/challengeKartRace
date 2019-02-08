import { PilotHighLight } from '../interfaces/pilotHighLight';
import { RaceHighLight, BestRaceLap } from '../interfaces/raceHighLight';
import { Pilot } from './../interfaces/pilot';
import { RaceLap, PilotRaceLaps } from './../interfaces/raceLap';
import { duration, Duration } from 'moment';

/**
 * @class
 *
 * Process informations of a file 
 */
export class DataProcessor {

    constructor(private readonly raceLaps: RaceLap[]) {
    }

    /**
	 * Get the race and pilots highLights
	 * @param getHighLights
	 */
    public getHighLights(): RaceHighLight {
        const pilots = this.getAllPilots();
        const raceStartHour = this.getRaceStartHour();

        const pilotsHighLights: PilotHighLight[] = pilots.reduce((acc: PilotHighLight[], pilot: Pilot) => {
            const pilotRaceLaps = this.getPilotRaceLaps(pilot.pilotNumber, raceStartHour);

            const pilotbestLap = this.getPilotBestLap(pilotRaceLaps.raceLaps);
            const pilotRaceTotalTime = this.getPilotRaceTotalTime(pilotRaceLaps.raceLaps);
            const pilotVelocityAverage = this.getPilotRaceVelocityAverage(pilotRaceLaps.raceLaps);

            const hightLight: PilotHighLight = {
                pilotNumber: pilot.pilotNumber,
                pilotName: pilot.pilotName,
                bestLap: pilotbestLap,
                raceTotalTime: pilotRaceTotalTime,
                raceAverageVelocity: pilotVelocityAverage,
                totalNumberOfLaps: pilotRaceLaps.totalNumberOfLaps
            };

            return this.setPilotsTotalTimeAfterWinner(this.setRacePodium([...acc, hightLight]));

        }, [] as PilotHighLight[]);

        const bestRaceLap = this.getRaceBestLap(pilotsHighLights);

        const raceHighLight = {
            podium: pilotsHighLights,
            bestRaceLap: bestRaceLap
        }

        return raceHighLight;
    }

    /**
	 * Get the hour of when the race started
	 * @param getRaceStartHour
	 */
    private getRaceStartHour(): Duration {
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
    private getPilotRaceLaps(pilotNumber: string, raceStartHour: Duration): PilotRaceLaps {
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
    private getPilotBestLap(pilotRaceLaps: RaceLap[]): Duration {
        let bestLapTime = duration(99999999);

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
    private getPilotRaceVelocityAverage(pilotRaceLaps: RaceLap[]): number {
        const velocityAverages: number[] = pilotRaceLaps.reduce((acc: number[], pilotRaceLap: RaceLap) => {
            return [...acc, pilotRaceLap.lapAverageVelocity];
        }, [] as number[]);

        return this.calculatePilotRaceVelocityAverage(velocityAverages);
    }

    /**
	 * Get the sum of the time from all laps from an specific pilot
	 * @param getPilotRaceTotalTime
	 */
    private getPilotRaceTotalTime(pilotRaceLaps: RaceLap[]): Duration {
        const totalTime: Duration = pilotRaceLaps.reduce((acc: Duration, prl: RaceLap) => {
            return duration(acc).add(prl.lapTime);
        }, {} as Duration);

        return totalTime;
    }

    private setPilotsTotalTimeAfterWinner(pilotsHighLights: PilotHighLight[]): PilotHighLight[] {
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
    private getRaceBestLap(pilotsHighLights: PilotHighLight[]): BestRaceLap {
        let bestRaceLap: BestRaceLap = {
            pilotName: "",
            lapTime: duration(99999999)
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
	 * Set the pilotshigh lights by arrival order
	 * @param setRacePodium
	 */
    private setRacePodium(pilotsHighLights: PilotHighLight[]) {
        return pilotsHighLights.sort((a, b) => a.raceTotalTime.asMilliseconds() - b.raceTotalTime.asMilliseconds());
    }

    /**
	 * Get all pilots names and number
	 * @param getAllPilots
	 */
    private getAllPilots(): Pilot[] {
        const pilots: Pilot[] = this.raceLaps.reduce((acc: Pilot[], raceLap: RaceLap) => {
            const pilot: Pilot = {
                pilotName: raceLap.pilotName,
                pilotNumber: raceLap.pilotNumber
            }

            if (acc.filter(p => p.pilotNumber === pilot.pilotNumber).length) {
                return acc
            };

            return [...acc, pilot];

        }, [] as Pilot[]);

        return pilots;
    }

    /**
	 * Calculate the pilot race velocity average
	 * @param getAllPilots
	 */
    private calculatePilotRaceVelocityAverage(velocityAverages: number[]): number {
        const total: number = velocityAverages.reduce((acc: number, velocityAverage: number) => {
            return acc + velocityAverage;
        });

        const raceVelocityAverage = total / velocityAverages.length;

        return Number(raceVelocityAverage.toFixed(3));
    }

}