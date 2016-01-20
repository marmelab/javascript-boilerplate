import User from './userModel';
import crud from '../lib/crud';

export default crud(User, ['GET']);
