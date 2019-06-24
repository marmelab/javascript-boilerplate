import orderRepositoryFactory from './orderRepository';
import crud from '../lib/middlewares/pgCrud';

export default crud(orderRepositoryFactory, ['GET', 'POST', 'PUT', 'DELETE']);
