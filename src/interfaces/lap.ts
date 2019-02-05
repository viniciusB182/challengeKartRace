import { Duration } from 'moment';

/**
 * @interface
 * Interface para volta
 */
export interface Lap {
    lapTime: Duration;
	lapNumber: number;
	lapAverageVelocity: number;
}