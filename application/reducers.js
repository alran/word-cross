import { combineReducers } from 'redux';
import routes from './routes';
import duckReducers from './duck';

export default combineReducers({
  routes,
  duckReducers,
});
