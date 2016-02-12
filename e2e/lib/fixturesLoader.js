import data from '../fixtures/demo_fixtures.json';
import productFactory from '../../src/api/products/productModel';

export default function(client) {
    const productQueries = productFactory(client);
    function* loadDefaultFixtures() {
        yield productQueries.batchInsert(data.products);
    }
    function* removeAllFixtures() {
        yield client.query_('TRUNCATE product CASCADE');
    }

    return {
        loadDefaultFixtures,
        removeAllFixtures,
    };
}
