/* eslint func-names: off */
import expect, { createSpy } from 'expect';
import { customFetch } from './fetch';

global.API_URL = 'http://api';

describe('customFetch', () => {
    const fetch = createSpy().andReturn(Promise.resolve({
        ok: true,
        json: () => ['data'],
    }));

    afterEach(() => {
        fetch.reset();
    });

    after(() => {
        fetch.restore();
    });

    it('should call fetch with correct parameters when a method is specified', function* () {
        yield customFetch(fetch)('foo', 'METHOD')();
        expect(fetch).toHaveBeenCalledWith('http://api/foo', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            method: 'METHOD',
            body: undefined,
        });
    });

    it('should call fetch with correct parameters when called with a body', function* () {
        yield customFetch(fetch)('foo')({ body: { param: 'bar' } });
        expect(fetch).toHaveBeenCalledWith('http://api/foo', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({ param: 'bar' }),
        });
    });

    it('should call fetch with correct parameters when called with a body and a custom method', function* () {
        yield customFetch(fetch)('foo', 'PUT')({ body: { param: 'bar' } });
        expect(fetch).toHaveBeenCalledWith('http://api/foo', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify({ param: 'bar' }),
        });
    });

    it('should call fetch with correct parameters when called with an id', function* () {
        yield customFetch(fetch)('foo')({ id: 'entityId' });
        expect(fetch).toHaveBeenCalledWith('http://api/foo/entityId', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            method: 'GET',
            body: undefined,
        });
    });

    it('should call fetch with correct parameters when called with an id and a body', function* () {
        yield customFetch(fetch)('foo')({ id: 'entityId', body: { param: 'bar' } });
        expect(fetch).toHaveBeenCalledWith('http://api/foo/entityId', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify({ param: 'bar' }),
        });
    });

    it('should call fetch with correct parameters when called with jwt', function* () {
        yield customFetch(fetch)('foo')({ jwt: 'token' });
        expect(fetch).toHaveBeenCalledWith('http://api/foo', {
            headers: {
                Accept: 'application/json',
                Authorization: 'token',
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            method: 'GET',
            body: undefined,
        });
    });

    it('should handle failed response', function* () {
        const failedFetch = createSpy().andReturn(Promise.resolve({
            ok: false,
            text: () => Promise.resolve('Run you fools !'),
        }));

        const result = yield customFetch(failedFetch)('foo')();

        expect(result).toEqual({
            error: new Error('Run you fools !'),
        });
    });

    it('should handle successfull response', function* () {
        const result = yield customFetch(fetch)('foo')();

        expect(result).toEqual({
            result: ['data'],
        });
    });
});
