/* eslint-disable func-names */
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import internetCheck from './internet';

chai.use(sinonChai);

describe('Healthcare', () => {
    describe('Internet access', () => {
        it('should call fetch with url from config', function* () {
            const fetch = sinon.stub().returns(Promise.resolve({ status: 200 }));

            yield internetCheck({
                internetUrl: 'foo',
            }, fetch);

            expect(fetch).to.have.been.calledWith('foo');
        });

        it('should return a valid result when fetch response is ok', function* () {
            const fetch = sinon.stub().returns(Promise.resolve({ status: 200 }));

            const result = yield internetCheck({
                internetUrl: 'foo',
            }, fetch);

            expect(result).to.equal(true);
        });

        it('should return an invalid result when fetch response is not ok', function* () {
            const fetch = sinon.stub().returns(Promise.resolve({ status: 500, statusText: 'foo' }));

            const result = yield internetCheck({
                internetUrl: 'foo',
            }, fetch);

            expect(result).to.equal(false);
        });
    });
});
