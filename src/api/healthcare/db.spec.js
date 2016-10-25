/* eslint-disable func-names */
import expect, { createSpy } from 'expect';
import dbCheck from './db';

describe('Healthcare', () => {
    describe('DB', () => {
        it('should call dbClientFactory with correct config', function* () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.resolve({ rows: [] })),
            });

            yield dbCheck({
                foo: 'foo',
            }, dbClientFactory);

            expect(dbClientFactory).toHaveBeenCalledWith({
                foo: 'foo',
            });
        });

        it('should return a valid result when db query response is ok', function* () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.resolve(['valid response'])),
            });

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(true);
        });

        it('should return an invalid result when db client factory fail', function* () {
            const dbClientFactory = createSpy().andThrow();

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(false);
        });

        it('should return an invalid result when db client query fail', function* () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.reject()),
            });

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(false);
        });

        it('should return an invalid result when db query does not return rows', function* () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.resolve([])),
            });

            const result = yield dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(false);
        });
    });
});
