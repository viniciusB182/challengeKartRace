import { Duration, utc, duration } from "moment";

/**
 * @class
 *
 * Format Data value types
 */
export class DataFormatter {
    public durationFormatter(d: Duration): string {
        return `${utc(duration(d).asMilliseconds()).format('m[m] ss[s] SSS[ms]')}`;
    }
}