import { PilotHighLight } from './pilotHighLight';
import { Duration } from 'moment';
import { Pilot } from './pilot';

/**
 * @interface
 * Interface for the HighLights of the Race
 */
export interface HighLight extends PilotHighLight {
	podium: Pilot[];
	bestRaceLap: Duration;
	timeAfterTheWinner: Duration;
}