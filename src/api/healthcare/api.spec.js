/* eslint-disable func-names */
import expect, { createSpy } from 'expect';
import apiCheck from './api';

describe('Healthcare', () => {
    describe('API', () => {
        it('should call fetch with url from config', function* () {
            const fetch = createSpy().andReturn(Promise.resolve({ status: 200 }));

            yield apiCheck({
                apiUrl: 'foo',
                endPoint: '/bar',
            }, fetch);

            expect(fetch).toHaveBeenCalledWith('foo/bar', {
                headers: { origin: 'foo' },
            });
        });

        it('should return a valid result when api response is ok', function* () {
            const fetch = createSpy().andReturn(Promise.resolve({ status: 200 }));

            const result = yield apiCheck({
                apiUrl: 'foo',
                endPoint: '/bar',
            }, fetch);

            expect(result).toEqual(true);
        });

        it('should return an invalid result when api response is not ok', function* () {
            const fetch = createSpy().andReturn(Promise.resolve({ status: 500, statusText: 'foo' }));

            const result = yield apiCheck({
                apiUrl: 'foo',
                endPoint: '/bar',
            }, fetch);

            expect(result).toEqual(false);
        });
    });
});
