import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from '../shared/stores/app.reducer';
import recentlyUsed from '../shared/stores/recently-used.reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  app,
  recentlyUsed,
});

export default rootReducer;
