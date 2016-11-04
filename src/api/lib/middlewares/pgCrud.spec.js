/* eslint func-names:0 */

import expect, { createSpy } from 'expect';
import { pgCrudFactory } from './pgCrud';

describe('pgCrud middleware', () => {
    describe('get', () => {
        it('should return the correct count', async function () {
            const pgCrud = pgCrudFactory();

            const ctx = {
                availableMethods: { GET: 'managed' },
                queries: {
                    selectPage: createSpy().andReturn(Promise.resolve([])),
                    countAll: createSpy().andReturn(Promise.resolve({ count: 42 })),
                },
                request: { query: {} },
                set: createSpy(),
            };

            await pgCrud.get(ctx);

            expect(ctx.set).toHaveBeenCalledWith('X-Total-Count', 42);
        });
    });
});
