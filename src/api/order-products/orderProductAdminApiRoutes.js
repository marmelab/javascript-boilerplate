import orderProductRepositoryFactory from './orderProductRepository';
import crud from '../lib/middlewares/pgCrud';

export default crud(orderProductRepositoryFactory, ['GET', 'POST', 'PUT', 'DELETE']);
