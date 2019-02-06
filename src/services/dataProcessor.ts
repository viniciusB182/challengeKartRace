import { HighLight } from './../interfaces/highLight';
import { Pilot } from './../interfaces/pilot';
import { RaceLap } from './../interfaces/raceLap';
import { duration, Duration } from 'moment';

/**
 * @class
 *
 * Parse a file into {@link DataProcessor} structure
 */
export class DataProcessor {

    constructor(private readonly raceLaps: RaceLap[]) {
    }

    public getHighLights() {
        const pilots = this.getAllPilots();

        const pilotsHighLights: HighLight[] = pilots.reduce((acc: HighLight[], pilot: Pilot) => {
            const pilotRaceLaps = this.raceLaps.filter(rl => rl.pilotNumber === pilot.pilotNumber);

            const bestLap = this.getBestPilotLap(pilotRaceLaps);
            const raceVelocityAverage = this.getPilotRaceVelocityAverage(pilotRaceLaps);

            const hightLight: HighLight = {
                pilotNumber: pilot.pilotNumber,
                pilotName: pilot.pilotName,
                bestLap: bestLap,
                raceAverageVelocity: raceVelocityAverage,
                timeAfterTheWinner: duration(99999999)
            };

            return [...acc, hightLight]
        }, [] as HighLight[]);

        console.log(pilotsHighLights);
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

    private getBestPilotLap(pilotRaceLaps: RaceLap[]): Duration {
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

        return this.calculateRaceVelocityAverage(velocityAverages);
    }

    private calculateRaceVelocityAverage(velocityAverages: number[]): number {
        const total: number = velocityAverages.reduce((acc: number, velocityAverage: number) => {
            return acc + velocityAverage;
        });

        const raceVelocityAverage = total / velocityAverages.length;

        return Number(raceVelocityAverage.toFixed(3));
    }
}