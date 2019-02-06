import { Duration } from 'moment';

/**
 * @interface
 * Interface for a Lap
 */
export interface Lap {
    lapTime: Duration;
	lapNumber: number;
	lapAverageVelocity: number;
}