import OrderProduct from './orderProductModel';
import crud from '../lib/middlewares/pgCrud';

export default crud(OrderProduct, ['GET', 'POST', 'PUT', 'DELETE']);
