import { RaceHighLight } from "../interfaces/raceHighLight";
import { Duration, utc, duration } from "moment";

/**
 * @class
 *
 * Display data on console
 */
export class DataViewer {
	public viewResults(raceHighLight: RaceHighLight) {
		const formattedRaceHighLight = raceHighLight.podium.map(pilotPodium => {
			return {
                Piloto: pilotPodium.pilotName,
                Numero: pilotPodium.pilotNumber,
                Posicao: pilotPodium.arrivalPosition,
                TempoTotalDeCorrida: this.durationFormatter(pilotPodium.raceTotalTime),
                MelhorVolta: this.durationFormatter(pilotPodium.bestLap),
                VelocidadeMedia: pilotPodium.raceAverageVelocity,
                TempoDeChegadaAposOVencedor: pilotPodium.timeAfterTheWinner,
                VoltasCompletas: pilotPodium.totalNumberOfLaps
			};
        });
        
		console.table(formattedRaceHighLight);
    }
    
    private durationFormatter(d: Duration) {
        return `${utc(duration(d).asMilliseconds()).format('m[m] ss[s] SSS[ms]')}`;
    }
}