import { Pilot } from './pilot';
import { Duration } from 'moment';

/**
 * @interface
 * Interface for the HighLights of a Pilot
 */
export interface PilotHighLight extends Pilot {
	bestLap: Duration;
	arrivalPosition?: number;
	raceAverageVelocity: number;
	raceTotalTime: Duration;
	timeAfterTheWinner?: Duration;
	totalNumberOfLaps: number;
}