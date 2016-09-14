import Product from './productModel';
import crud from '../lib/middlewares/pgCrud';

export default crud(Product, ['GET', 'POST', 'PUT', 'DELETE']);
