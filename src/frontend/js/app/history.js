/* globals FRONTEND_HISTORY, FRONTEND_URL */
import { useRouterHistory } from 'react-router';

const createHistory = require('history/lib/' + FRONTEND_HISTORY);
const history = useRouterHistory(createHistory)();

export default history;
