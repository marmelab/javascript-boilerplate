import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import dbCheck from './db';

chai.use(sinonChai);

describe('Healthcare', () => {
    describe('DB', () => {
        it('should call dbClientFactory with correct config', function* (done) {
            const dbClientFactory = sinon.stub().returns(Promise.resolve({
                client: {
                    query_: sinon.stub().returns(Promise.resolve({ rows: [] })),
                },
            }));

            try {
                yield dbCheck({
                    foo: 'foo',
                }, dbClientFactory);
            } catch (err) {
                done(err);
            }
            expect(dbClientFactory).to.have.been.calledWith({
                foo: 'foo',
            });
            done();
        });

        it('should return a valid result when db query response is ok', function* () {
            const dbClientFactory = sinon.stub().returns(Promise.resolve({
                client: {
                    query_: sinon.stub().returns(Promise.resolve({ rows: ['valid response'] })),
                },
            }));

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result.valid).to.equal(true);
            expect(result.message).to.equal('OK');
        });

        it('should return an invalid result when db client factory fail', function* () {
            const dbClientFactory = sinon.stub().returns(Promise.reject());

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result.valid).to.equal(false);
            expect(result.message).to.equal('KO - Unable to connect to database');
        });

        it('should return an invalid result when db client query fail', function* () {
            const dbClientFactory = sinon.stub().returns(Promise.resolve({
                client: {
                    query_: sinon.stub().returns(Promise.reject()),
                },
            }));

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result.valid).to.equal(false);
            expect(result.message).to.equal('KO - Unable to connect to database');
        });

        it('should return an invalid result when db query does not return rows', function* () {
            const dbClientFactory = sinon.stub().returns(Promise.resolve({
                client: {
                    query_: sinon.stub().returns(Promise.resolve({ rows: [] })),
                },
            }));

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result.valid).to.equal(false);
            expect(result.message).to.equal('KO - Invalid response from database');
        });
    });
});
