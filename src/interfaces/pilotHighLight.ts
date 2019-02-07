import { Pilot } from './pilot';
import { Duration } from 'moment';

/**
 * @interface
 * Interface for the HighLights of a Pilot
 */
export interface PilotHighLight extends Pilot {
	bestLap: Duration;
	arrivalPosition?: string;
	raceAverageVelocity: number;
	raceTotalTime: Duration;
	timeAfterTheWinner?: Duration;
}