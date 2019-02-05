"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 *
 * Parse a file into {@link DataProcessor} structure
 */
class DataProcessor {
    constructor(raceLaps) {
        this.raceLaps = raceLaps;
    }
    getAllPilots() {
        const pilots = this.raceLaps.reduce((acc, raceLap) => {
            const pilot = {
                pilotName: raceLap.pilotName,
                pilotNumber: raceLap.pilotNumber
            };
            if (acc.filter(p => p.pilotName === pilot.pilotName).length) {
                return acc;
            }
            ;
            return [...acc, pilot];
        }, []);
        return pilots;
    }
}
exports.DataProcessor = DataProcessor;
//# sourceMappingURL=dataProcessor.js.map