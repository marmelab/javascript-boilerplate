/* eslint-disable func-names */
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import dbCheck from './db';

chai.use(sinonChai);

describe('Healthcare', () => {
    describe('DB', () => {
        it('should call dbClientFactory with correct config', function* () {
            const dbClientFactory = sinon.stub().returns({
                query: sinon.stub().returns(Promise.resolve({ rows: [] })),
            });

            yield dbCheck({
                foo: 'foo',
            }, dbClientFactory);

            expect(dbClientFactory).to.have.been.calledWith({
                foo: 'foo',
            });
        });

        it('should return a valid result when db query response is ok', function* () {
            const dbClientFactory = sinon.stub().returns({
                query: sinon.stub().returns(Promise.resolve(['valid response'])),
            });

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).to.equal(true);
        });

        it('should return an invalid result when db client factory fail', function* () {
            const dbClientFactory = sinon.stub().throws();

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).to.equal(false);
        });

        it('should return an invalid result when db client query fail', function* () {
            const dbClientFactory = sinon.stub().returns({
                query: sinon.stub().returns(Promise.reject()),
            });

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).to.equal(false);
        });

        it('should return an invalid result when db query does not return rows', function* () {
            const dbClientFactory = sinon.stub().returns({
                query: sinon.stub().returns(Promise.resolve([])),
            });

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).to.equal(false);
        });
    });
});
