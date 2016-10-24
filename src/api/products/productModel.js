import productQueries from './productQueries';


function productModel(client) {
    return client.link(productModel.queries);
}

productModel.queries = productQueries;

export default productModel;
