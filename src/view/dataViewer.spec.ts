import { RaceHighLight } from './../interfaces/raceHighLight';
import chai, { expect } from 'chai';
import { DataViewer } from './dataViewer';
import { duration } from 'moment';
import { stub } from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('dataViewer', () => {
    const stubbedConsole = stub(console, 'table');
    const dataViewer = new DataViewer();

    const winnerPilotHighLight = {
        pilotNumber: "01",
        pilotName: "Ayrton Senna",
        bestLap: duration(1000),
        arrivalPosition: 1,
        raceAverageVelocity: 80,
        raceTotalTime: duration(4000),
        timeAfterTheWinner: duration(0),
        totalNumberOfLaps: 4
    };

    const normalPilotHighLight = {
        pilotNumber: "02",
        pilotName: "Emerson Fittipaldi",
        bestLap: duration(2000),
        arrivalPosition: 2,
        raceAverageVelocity: 70,
        raceTotalTime: duration(8000),
        timeAfterTheWinner: duration(4000),
        totalNumberOfLaps: 4
    };
    
    const incompletedRacePilotHighLight = {
        pilotNumber: "03",
        pilotName: "Tony Kanaan",
        bestLap: duration(3000),
        arrivalPosition: 3,
        raceAverageVelocity: 60,
        raceTotalTime: duration(12000),
        timeAfterTheWinner: undefined,
        totalNumberOfLaps: 3
    };
    
    const winnerPilotHightLightToBe = {
        piloto: "Ayrton Senna",
        numero: "01",
        posicao: 1,
        tempoTotalDeProva: "0m 04s 000ms",
        melhorVolta: "0m 01s 000ms",
        velocidadeMedia: 80,
        tempoDeChegadaAposOVencedor: "Vencedor",
        voltasCompletas: 4
    };

    const normalPilotHighLightToBe = {
        piloto: "Emerson Fittipaldi",
        numero: "02",
        posicao: 2,
        tempoTotalDeProva: "0m 08s 000ms",
        melhorVolta: "0m 02s 000ms",
        velocidadeMedia: 70,
        tempoDeChegadaAposOVencedor: "0m 04s 000ms",
        voltasCompletas: 4
    };

    const incompletedRacePilotHighLightToBe = {
        piloto: "Tony Kanaan",
        numero: "03",
        posicao: 3,
        tempoTotalDeProva: "0m 12s 000ms",
        melhorVolta: "0m 03s 000ms",
        velocidadeMedia: 60,
        tempoDeChegadaAposOVencedor: "Não completou a prova",
        voltasCompletas: 3
    };

    it('should show the final HighLights with tempoDeChegadaAposOVencedor formatted if the pilot is the winner', () => {
        const raceHighLight: RaceHighLight = {
            podium: [winnerPilotHighLight],
            bestRaceLap: { pilotName: "Ayrton Senna", lapTime: duration(1000) }
        };

        dataViewer.viewResults(raceHighLight);

        expect(stubbedConsole).to.be.calledWith({
            melhorVoltaDaProva: "Ayrton Senna em 0m 01s 000ms"
        });

        expect(stubbedConsole).to.be.calledWith([winnerPilotHightLightToBe]);
    });

    it('should show the final HighLights with tempoDeChegadaAposOVencedor in the normal format', () => {
        const raceHighLight: RaceHighLight = {
            podium: [winnerPilotHighLight, normalPilotHighLight],
            bestRaceLap: { pilotName: "Ayrton Senna", lapTime: duration(1000) }
        };

        dataViewer.viewResults(raceHighLight);

        expect(stubbedConsole).to.be.calledWith({
            melhorVoltaDaProva: "Ayrton Senna em 0m 01s 000ms"
        });

        expect(stubbedConsole).to.be.calledWith([
            winnerPilotHightLightToBe, 
            normalPilotHighLightToBe
        ]);
    });

    it('should show the final HighLights with tempoDeChegadaAposOVencedor formatted if the pilot not finished the race ', () => {
        const raceHighLight: RaceHighLight = {
            podium: [winnerPilotHighLight, normalPilotHighLight, incompletedRacePilotHighLight],
            bestRaceLap: { pilotName: "Ayrton Senna", lapTime: duration(1000) }
        };

        dataViewer.viewResults(raceHighLight);

        expect(stubbedConsole).to.be.calledWith({
            melhorVoltaDaProva: "Ayrton Senna em 0m 01s 000ms"
        });

        expect(stubbedConsole).to.be.calledWith([
            winnerPilotHightLightToBe, 
            normalPilotHighLightToBe,
            incompletedRacePilotHighLightToBe
        ]);
    });
});
