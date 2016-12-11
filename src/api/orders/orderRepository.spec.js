import expect, { createSpy } from 'expect';
import { selectOne, sanitizeProduct } from './orderRepository';

describe('Order repository', () => {
    let client;

    beforeEach(() => {
        client = () => { };
        client.link = () => ({});
    });

    describe('selectOne', () => {
        const expectedOrder = { id: 'order1' };
        const expectedOrderProducts = [{ id: 'orderProduct1' }, { id: 'orderProduct2' }];

        const orderClient = {
            selectOne: createSpy().andReturn(Promise.resolve(expectedOrder)),
        };

        const orderProductClient = {
            selectByOrderId: createSpy().andReturn(Promise.resolve(expectedOrderProducts)),
        };

        it('should return an order with its products', async () => {
            const order = await selectOne(orderClient, orderProductClient)({ id: 'order1' });

            expect(orderClient.selectOne).toHaveBeenCalledWith({ id: 'order1' });
            expect(orderProductClient.selectByOrderId).toHaveBeenCalledWith('order1');

            expect(order).toEqual(Object.assign({}, expectedOrder, {
                products: expectedOrderProducts,
            }));
        });
    });

    describe('sanitizeProduct', () => {
        it('should sanitize the product, overriding incorrect values with those from DB', async () => {
            const product = {
                id: 'foo',
                price: 0,
                label: 'bar',
            };

            const expectedProduct = {
                id: 'foo',
                price: 100,
                label: 'not_bar',
            };

            const productClient = {
                selectOneById: createSpy().andReturn(expectedProduct),
            };

            const sanitizedProduct = await sanitizeProduct(productClient)(product);

            expect(productClient.selectOneById).toHaveBeenCalledWith({ id: 'foo' });
            expect(sanitizedProduct).toEqual(expectedProduct);
        });
    });
});
