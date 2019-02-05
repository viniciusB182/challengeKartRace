import { Pilot } from './../interfaces/pilot';
import { RaceLap } from './../interfaces/raceLap';

/**
 * @class
 *
 * Parse a file into {@link DataProcessor} structure
 */
export class DataProcessor {

    constructor(private readonly raceLaps: RaceLap[]) {
    }

    private getAllPilots() {
        const pilots: Pilot[] = this.raceLaps.reduce((acc: Pilot[], raceLap: RaceLap) => {
            const pilot: Pilot = {
                pilotName: raceLap.pilotName,
                pilotNumber: raceLap.pilotNumber
            }

            if (acc.filter(p => p.pilotName === pilot.pilotName).length) { return acc };

            return [...acc, pilot];

        }, [] as Pilot[]);

        return pilots;
    }
}