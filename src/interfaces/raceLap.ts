import { Pilot } from './pilot';
import { Lap } from './lap';
import { Duration } from 'moment';

/**
 * @interface
 * Interface for a Race Lap
 */
export interface RaceLap extends Pilot, Lap {
    logHour: Duration;
}