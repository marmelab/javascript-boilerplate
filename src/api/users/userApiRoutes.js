import userRepositoryFactory from './userRepository';
import crud from '../lib/middlewares/pgCrud';

export default crud(userRepositoryFactory, ['GET']);
