import { DataFormatter } from './../services/dataFormatter';
import { RaceHighLight } from "../interfaces/raceHighLight";

/**
 * @class
 *
 * Display data on console
 */
export class DataViewer {
	public viewResults(raceHighLight: RaceHighLight) {
        const dataFormatter = new DataFormatter();

		const formattedPilotsHighLight = raceHighLight.podium.map(pilotPodium => {

            let formattedtimeAfterTheWinner: string;

            if(!pilotPodium.timeAfterTheWinner) {
                formattedtimeAfterTheWinner = "Não completou a prova";
            }
            else if(pilotPodium.arrivalPosition === 1) {
                formattedtimeAfterTheWinner = "Vencedor";
            }
            else {
                formattedtimeAfterTheWinner = dataFormatter.durationFormatter(pilotPodium.timeAfterTheWinner);
            }

			return {
                piloto: pilotPodium.pilotName,
                numero: pilotPodium.pilotNumber,
                posicao: pilotPodium.arrivalPosition,
                tempoTotalDeProva: dataFormatter.durationFormatter(pilotPodium.raceTotalTime),
                melhorVolta: dataFormatter.durationFormatter(pilotPodium.bestLap),
                velocidadeMedia: pilotPodium.raceAverageVelocity,
                tempoDeChegadaAposOVencedor: formattedtimeAfterTheWinner,
                voltasCompletas: pilotPodium.totalNumberOfLaps
			};
        });

        const formattedRaceHighLight = {
            melhorVoltaDaProva: `${raceHighLight.bestRaceLap.pilotName} em ${dataFormatter.durationFormatter(raceHighLight.bestRaceLap.lapTime)}`
        };
        
        //TODO Sinalizar informacoes
        console.table(formattedRaceHighLight);
		console.table(formattedPilotsHighLight);
    }
}