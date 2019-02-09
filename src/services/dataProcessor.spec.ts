import { RaceLap } from '../interfaces/raceLap';
import { expect } from 'chai';
import { duration, Duration } from 'moment';
import { DataProcessor } from './dataProcessor';

describe('dataProcessor', () => {
    const dataToProcess: RaceLap[] = [{
        pilotNumber: "01",
        pilotName: "Ayrton Senna",
        lapTime: duration(1600),
        lapNumber: 1,
        lapAverageVelocity: 60,
        logHour: duration(23, 'h').add(1600),
    },
    {
        pilotNumber: "01",
        pilotName: "Ayrton Senna",
        lapTime: duration(1600),
        lapNumber: 2,
        lapAverageVelocity: 60,
        logHour: duration(23, 'h').add(1600).add(1600),
    },
    {
        pilotNumber: "01",
        pilotName: "Ayrton Senna",
        lapTime: duration(1500),
        lapNumber: 3,
        lapAverageVelocity: 70,
        logHour: duration(23, 'h').add(1600).add(1600).add(1500),
    },
    {
        pilotNumber: "01",
        pilotName: "Ayrton Senna",
        lapTime: duration(1600),
        lapNumber: 4,
        lapAverageVelocity: 60,
        logHour: duration(23, 'h').add(1600).add(1600).add(1500).add(1600),
    },
    {
        pilotNumber: "02",
        pilotName: "Emerson Fittipaldi",
        lapTime: duration(1700),
        lapNumber: 1,
        lapAverageVelocity: 50,
        logHour: duration(23, 'h').add(1700),
    },
    {
        pilotNumber: "02",
        pilotName: "Emerson Fittipaldi",
        lapTime: duration(1700),
        lapNumber: 2,
        lapAverageVelocity: 50,
        logHour: duration(23, 'h').add(1700).add(1700),
    },
    {
        pilotNumber: "02",
        pilotName: "Emerson Fittipaldi",
        lapTime: duration(1700),
        lapNumber: 3,
        lapAverageVelocity: 50,
        logHour: duration(23, 'h').add(1700).add(1700).add(1700),
    },
    {
        pilotNumber: "02",
        pilotName: "Emerson Fittipaldi",
        lapTime: duration(1600),
        lapNumber: 4,
        lapAverageVelocity: 60,
        logHour: duration(23, 'h').add(1700).add(1700).add(1700).add(1600),
    },
    {
        pilotNumber: "03",
        pilotName: "Tony Kanaan",
        lapTime: duration(1700),
        lapNumber: 1,
        lapAverageVelocity: 40,
        logHour: duration(23, 'h').add(1700),
    },
    {
        pilotNumber: "03",
        pilotName: "Tony Kanaan",
        lapTime: duration(1800),
        lapNumber: 2,
        lapAverageVelocity: 30,
        logHour: duration(23, 'h').add(1800).add(1800),
    },
    {
        pilotNumber: "03",
        pilotName: "Tony Kanaan",
        lapTime: duration(1800),
        lapNumber: 3,
        lapAverageVelocity: 30,
        logHour: duration(23, 'h').add(1800).add(1800).add(1800),
    }];

    it('should process the run data with three pilots and just two finishing the run', () => {
        const dataProcessor = new DataProcessor(dataToProcess);

        const result = dataProcessor.getHighLights();

        // melhorVoltaDaProva

        expect(result).to.be.an('object');
        expect(result.podium).to.be.an('array');
        expect(result.podium).to.have.property('length', 3);

        expect(result.podium[0]).to.have.property('pilotName', "Ayrton Senna");
        expect(result.podium[0]).to.have.property('pilotNumber', "01");
        expect(result.podium[0]).to.have.property('arrivalPosition', 1);
        expect(result.podium[0]).to.have.property('raceTotalTime');
        expect(result.podium[0].raceTotalTime.asMilliseconds()).to.be.eq(6300);
        expect(result.podium[0]).to.have.property('bestLap');
        expect(result.podium[0].bestLap.asMilliseconds()).to.be.eq(1500);
        expect(result.podium[0]).to.have.property('raceAverageVelocity', 62.5);
        expect(result.podium[0]).to.have.property('timeAfterTheWinner');
        expect((result.podium[0].timeAfterTheWinner as Duration).asMilliseconds()).to.be.eq(0);
        expect(result.podium[0]).to.have.property('totalNumberOfLaps', 4);

        expect(result.podium[1]).to.have.property('pilotName', "Emerson Fittipaldi");
        expect(result.podium[1]).to.have.property('pilotNumber', "02");
        expect(result.podium[1]).to.have.property('arrivalPosition', 2);
        expect(result.podium[1]).to.have.property('raceTotalTime');
        expect(result.podium[1].raceTotalTime.asMilliseconds()).to.be.eq(6700);
        expect(result.podium[1]).to.have.property('bestLap');
        expect(result.podium[1].bestLap.asMilliseconds()).to.be.eq(1600);
        expect(result.podium[1]).to.have.property('raceAverageVelocity', 52.5);
        expect(result.podium[1]).to.have.property('timeAfterTheWinner');
        expect((result.podium[1].timeAfterTheWinner as Duration).asMilliseconds()).to.be.eq(400);
        expect(result.podium[1]).to.have.property('totalNumberOfLaps', 4);

        expect(result.podium[2]).to.have.property('pilotName', "Tony Kanaan");
        expect(result.podium[2]).to.have.property('pilotNumber', "03");
        expect(result.podium[2]).to.have.property('arrivalPosition', 3);
        expect(result.podium[2]).to.have.property('raceTotalTime');
        expect(result.podium[2].raceTotalTime.asMilliseconds()).to.be.eq(5300);
        expect(result.podium[2]).to.have.property('bestLap');
        expect(result.podium[2].bestLap.asMilliseconds()).to.be.eq(1700);
        expect(result.podium[2]).to.have.property('raceAverageVelocity', 33.333);
        expect(result.podium[2]).to.not.have.property('timeAfterTheWinner');
        expect(result.podium[2]).to.have.property('totalNumberOfLaps', 3);
    });
});