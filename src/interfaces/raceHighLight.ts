import { PilotHighLight } from './pilotHighLight';
import { Duration } from 'moment';

/**
 * @interface
 * Interface for the HighLights of the Race
 */
export interface RaceHighLight {
	podium: PilotHighLight[];
	bestRaceLap: BestRaceLap;
}

export type BestRaceLap = { pilotName: string, lapTime: Duration };