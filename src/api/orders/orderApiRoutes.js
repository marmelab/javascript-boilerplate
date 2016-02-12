import Order from './orderModel';
import crud from '../lib/crud';

export default crud(Order, ['GET', 'POST', 'DELETE']);
