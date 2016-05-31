/* eslint-disable func-names */

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import apiCheck from './api';

chai.use(sinonChai);

describe('Healthcare', () => {
    describe('API', () => {
        it('should call fetch with url from config', function* () {
            const fetch = sinon.stub().returns(Promise.resolve({ status: 200 }));

            yield apiCheck({
                apiUrl: 'foo',
                endpoint: '/bar',
            }, fetch);

            expect(fetch).to.have.been.calledWith('foo/bar');
        });

        it('should return a valid result when api response is ok', function* () {
            const fetch = sinon.stub().returns(Promise.resolve({ status: 200 }));

            const result = yield apiCheck({
                apiUrl: 'foo',
                endpoint: '/bar',
            }, fetch);

            expect(result).to.equal(true);
        });

        it('should return an invalid result when api response is not ok', function* () {
            const fetch = sinon.stub().returns(Promise.resolve({ status: 500, statusText: 'foo' }));

            const result = yield apiCheck({
                apiUrl: 'foo',
                endpoint: '/bar',
            }, fetch);

            expect(result).to.equal(false);
        });
    });
});
