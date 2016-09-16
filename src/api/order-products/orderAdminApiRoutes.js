import OrderProduct from './orderProductModel';
import crud from '../lib/crud';

export default crud(OrderProduct, ['GET', 'POST', 'PUT', 'DELETE']);
