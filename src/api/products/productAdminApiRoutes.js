import productRepositoryFactory from './productRepository';
import crud from '../lib/middlewares/pgCrud';

export default crud(productRepositoryFactory, ['GET', 'POST', 'PUT', 'DELETE']);
