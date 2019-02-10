import { expect } from 'chai';
import { DataReader } from './dataReader';

describe('dataReader', () => {
	it('should read the data from a file and parse to an Object Array', () => {
        const dataReader = new DataReader();
		const result = dataReader.getRaceData();

		expect(result).to.be.an('array');

		expect(result[0]).to.have.property('pilotNumber');
		expect(result[0]).to.have.property('pilotName');
		expect(result[0]).to.have.property('lapTime');
		expect(result[0]).to.have.property('lapNumber');
		expect(result[0]).to.have.property('lapAverageVelocity');
		expect(result[0]).to.have.property('logHour');
	});
});
