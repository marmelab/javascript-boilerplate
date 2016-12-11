import productQueries from './productQueries';

function productRepository(client) {
    return client.link(productRepository.queries);
}

productRepository.queries = productQueries;

export default productRepository;
