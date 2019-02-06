import { Pilot } from './pilot';
import { Duration } from 'moment';

/**
 * @interface
 * Interface for the HighLights of a Pilot
 */
export interface HighLight extends Pilot {
	bestLap: Duration;
	worstLap: Duration;
	raceAverageVelocity: number;
	timeAfterTheWinner: Duration;
}