import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import fetchFactory from './fetchEntities';

chai.use(sinonChai);

global.API_URL = 'http://api';
global.fetch = sinon.stub();
global.fetch.returns(Promise.resolve());

describe('fetchFactory', () => {
    afterEach(() => {
        global.fetch.reset();
    });

    it('should call fetch with correct parameters when called without jwt', () => {
        fetchFactory('foo')();
        expect(fetch).to.have.been.calledWith('http://api/foo', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        });
    });

    it('should call fetch with correct parameters when called without jwt but with an id', () => {
        fetchFactory('foo')(null, 'entityId');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        });
    });

    it('should call fetch with correct parameters when called with jwt', () => {
        fetchFactory('foo')('token');
        expect(fetch).to.have.been.calledWith('http://api/foo', {
            headers: {
                Accept: 'application/json',
                Authorization: 'token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        });
    });

    it('should call fetch with correct parameters when called with jwt and an id', () => {
        fetchFactory('foo')('token', 'entityId');
        expect(fetch).to.have.been.calledWith('http://api/foo/entityId', {
            headers: {
                Accept: 'application/json',
                Authorization: 'token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
        });
    });

    it('should handle failed response', done => {
        global.fetch.returns(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        fetchFactory('foo')().then(result => {
            expect(result).to.deep.equal({
                error: new Error('Run you fools !'),
            });

            done();
        }).catch(done);
    });

    it('should handle successfull response', done => {
        global.fetch.returns(Promise.resolve({
            ok: true,
            json: () => ['data'],
        }));

        fetchFactory('foo')().then(result => {
            expect(result).to.deep.equal({
                result: ['data'],
            });
            done();
        }).catch(done);
    });
});
