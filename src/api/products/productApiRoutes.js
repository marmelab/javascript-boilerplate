import Product from './productModel';
import crud from '../lib/crud';

export default crud(Product, ['GET']);
