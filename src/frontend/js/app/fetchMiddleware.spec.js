import {expect} from 'chai';
import sinon from 'sinon';
import middlewareFactory from './fetchMiddleware';

describe('fetch middleware', () => {
    const store = {
        dispatch: sinon.spy()
    };
    const next = sinon.spy();
    const sessionStorage = {
        getItem: sinon.stub().returns('foo'),
    };

    beforeEach(() => {
        store.dispatch.reset();
        next.reset();
    })

    it('should not handle actions without a request property', () => {
        const middleware = middlewareFactory()(store)(next);
        middleware({foo: 'bar'});
        expect(next.called).to.be.ok;
    });

    it('should call fetch with proper options', () => {
        const fetch = sinon.stub().returns(Promise.resolve());

        middlewareFactory(fetch, sessionStorage)(store)(next)({
            request: {
                url: 'http://foo',
                config: {
                    foo: 'bar',
                },
            },
        });

        expect(fetch.getCall(0).args).to.deep.equal([
            'http://foo',
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'foo',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                method: 'GET',
                foo: 'bar',
            },
        ]);
    });

    it('should dispatch the action returned by the onError callback when fetched response status is not between 200 and 300', () => {
        const fetch = sinon.stub().returns(Promise.resolve({
            status: 400,
        }));
        const onError = function() {};

        middlewareFactory(fetch, sessionStorage)(store)(next)({
            request: {
                url: 'http://foo',
                config: {
                    foo: 'bar',
                },
            },
            onError,
        });

        setTimeout(() => {
            expect(store.dispatch.getCall(0).args).to.equal(onError);
        }, 0);
    });

    it('should call next with a SUCCESS action when response is successfull', () => {
        const fetch = sinon.stub().returns(Promise.resolve({
            status: 200,
            headers: 'foo_headers',
            json: () => ({ foo: 'bar' }),
        }));

        const action = {
            type: 'FOO',
            request: {
                url: 'http://foo',
                config: {
                    foo: 'bar',
                },
            },
        };

        middlewareFactory(fetch, sessionStorage)(store)(next)(action);

        setTimeout(() => {
            expect(next.getCall(0).args).to.deep.equal({
                ...action,
                response: { foo: 'bar' },
                headers: 'foo_headers',
                type: `FOO_SUCCESS`,
                request: false,
            });
        }, 0);
    });

    it('should dispatch the action returned by the onSuccess callback when fetched response is successfull', () => {
        const fetch = sinon.stub().returns(Promise.resolve({
            status: 200,
        }));
        const onSuccess = function() {};

        middlewareFactory(fetch, sessionStorage)(store)(next)({
            request: {
                url: 'http://foo',
                config: {
                    foo: 'bar',
                },
            },
            onSuccess,
        });

        setTimeout(() => {
            expect(store.dispatch.getCall(0).args).to.equal(onSuccess);
        }, 0);
    });
});
