import { RaceHighLight } from "../interfaces/raceHighLight";

/**
 * @class
 *
 * Display data on console
 */
export class DataViewer {
	public viewResults(raceHighLight: RaceHighLight) {
		const formattedRaceHighLight = raceHighLight.podium.map(pilotPodium => {
			return {
                pilotName: pilotPodium.pilotName,
                pilotNumber: pilotPodium.pilotNumber,
                arrivalPosition: pilotPodium.arrivalPosition,
                raceTotalTime: pilotPodium,
                bestLap: pilotPodium.bestLap,
                raceAverageVelocity: pilotPodium.raceAverageVelocity,
                timeAfterTheWinner: pilotPodium.timeAfterTheWinner,
                totalNumberOfLaps: pilotPodium.totalNumberOfLaps
			};
        });
        
		console.table(formattedRaceHighLight);
    }
    
    // private durationFormatter(duration: Duration) {

    // }
}