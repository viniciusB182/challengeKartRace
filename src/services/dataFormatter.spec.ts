import { expect } from 'chai';
import { duration } from 'moment';
import { DataFormatter } from './../services/dataFormatter';

describe('dataFormatter', () => {
    it('should format a Duration object to View format', () => {
        const durationToFormat = duration(999999);

        const dataFormatter = new DataFormatter();

        const formattedDuration = dataFormatter.durationFormatter(durationToFormat);

        expect(formattedDuration).to.be.an("string");
        expect(formattedDuration).to.be.eq("16m 39s 999ms");
    });
});