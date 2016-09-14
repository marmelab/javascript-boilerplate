import Order from './orderModel';
import crud from '../lib/middlewares/pgCrud';

export default crud(Order, ['GET', 'POST', 'PUT', 'DELETE']);
