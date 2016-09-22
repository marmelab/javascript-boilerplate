import User from './userModel';
import crud from '../lib/middlewares/pgCrud';

export default crud(User, ['GET']);
