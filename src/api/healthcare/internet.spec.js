/* eslint-disable func-names */
import expect, { createSpy } from 'expect';
import internetCheck from './internet';

describe('Healthcare', () => {
    describe('Internet access', () => {
        it('should call fetch with url from config', function* () {
            const fetch = createSpy().andReturn(Promise.resolve({ status: 200 }));

            yield internetCheck({
                internetUrl: 'foo',
            }, fetch);

            expect(fetch).toHaveBeenCalledWith('foo');
        });

        it('should return a valid result when fetch response is ok', function* () {
            const fetch = createSpy().andReturn(Promise.resolve({ status: 200 }));

            const result = yield internetCheck({
                internetUrl: 'foo',
            }, fetch);

            expect(result).toEqual(true);
        });

        it('should return an invalid result when fetch response is not ok', function* () {
            const fetch = createSpy().andReturn(Promise.resolve({ status: 500, statusText: 'foo' }));

            const result = yield internetCheck({
                internetUrl: 'foo',
            }, fetch);

            expect(result).toEqual(false);
        });
    });
});
