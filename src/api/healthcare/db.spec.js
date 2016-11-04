/* eslint-disable func-names */
import expect, { createSpy } from 'expect';
import dbCheck from './db';

describe('Healthcare', () => {
    describe('DB', () => {
        it('should call dbClientFactory with correct config', async function () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.resolve({ rows: [] })),
            });

            await dbCheck({
                foo: 'foo',
            }, dbClientFactory);

            expect(dbClientFactory).toHaveBeenCalledWith({ foo: 'foo' });
        });

        it('should return a valid result when db query response is ok', async function () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.resolve(['valid response'])),
            });

            const result = await dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(true);
        });

        it('should return an invalid result when db client factory fail', async function () {
            const dbClientFactory = createSpy().andThrow();

            const result = await dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(false);
        });

        it('should return an invalid result when db client query fail', async function () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.reject()),
            });

            const result = await dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(false);
        });

        it('should return an invalid result when db query does not return rows', async function () {
            const dbClientFactory = createSpy().andReturn({
                query: createSpy().andReturn(Promise.resolve([])),
            });

            const result = await dbCheck({
            }, dbClientFactory);

            expect(result).toEqual(false);
        });
    });
});
