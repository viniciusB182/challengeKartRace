import { PilotHighLight } from '../interfaces/pilotHighLight';
import { RaceHighLight, BestRaceLap } from '../interfaces/raceHighLight';
import { Pilot } from './../interfaces/pilot';
import { RaceLap, PilotRaceLaps } from './../interfaces/raceLap';
import { duration, Duration } from 'moment';

/**
 * @class
 *
 * Parse a file into {@link DataProcessor} structure
 */
export class DataProcessor {

    constructor(private readonly raceLaps: RaceLap[]) {
    }

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

    private getRaceStartHour(): Duration {
        const firstLaps = this.raceLaps.filter(rl => rl.lapNumber === 1)
            .map(rl => rl.logHour.clone().subtract(rl.lapTime))
            .sort((a, b) => a.asMilliseconds() - b.asMilliseconds());

        return firstLaps[0];
    }

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

    private setRacePodium(pilotsHighLights: PilotHighLight[]) {
        return pilotsHighLights.sort((a, b) => a.raceTotalTime.asMilliseconds() - b.raceTotalTime.asMilliseconds());
    }

    private setPilotsTotalTimeAfterWinner(pilotsHighLights: PilotHighLight[]): PilotHighLight[] {
        pilotsHighLights.forEach(phl => {
            phl.arrivalPosition = pilotsHighLights.indexOf(phl) + 1;

            if (phl.arrivalPosition != 1 && phl.totalNumberOfLaps === 4) {
                phl.timeAfterTheWinner = phl.raceTotalTime.clone().subtract(pilotsHighLights[0].raceTotalTime);
            }
        });

        return pilotsHighLights;
    }

    private getPilotRaceTotalTime(pilotRaceLaps: RaceLap[]): Duration {
        const totalTime: Duration = pilotRaceLaps.reduce((acc: Duration, prl: RaceLap) => {
            return duration(acc).add(prl.lapTime);
        }, {} as Duration);

        return totalTime;
    }

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

    private getPilotBestLap(pilotRaceLaps: RaceLap[]): Duration {
        let bestLapTime = duration(99999999);

        pilotRaceLaps.forEach(lap => {
            if (lap.lapTime < bestLapTime) {
                bestLapTime = lap.lapTime;
            }
        });

        return bestLapTime;
    }

    private getPilotRaceVelocityAverage(pilotRaceLaps: RaceLap[]): number {
        const velocityAverages: number[] = pilotRaceLaps.reduce((acc: number[], pilotRaceLap: RaceLap) => {
            return [...acc, pilotRaceLap.lapAverageVelocity];
        }, [] as number[]);

        return this.calculatePilotRaceVelocityAverage(velocityAverages);
    }

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

    private calculatePilotRaceVelocityAverage(velocityAverages: number[]): number {
        const total: number = velocityAverages.reduce((acc: number, velocityAverage: number) => {
            return acc + velocityAverage;
        });

        const raceVelocityAverage = total / velocityAverages.length;

        return Number(raceVelocityAverage.toFixed(3));
    }

}