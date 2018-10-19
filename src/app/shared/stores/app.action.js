import { createAction } from 'redux-actions';
import {
  ROUTE_CHANGE,
  SET_CLIENT_SIZE,
  SET_URL,
} from './app.action-type';

export const routeChange = createAction(ROUTE_CHANGE, (route = {}) => {
  const {
    key, path, title, category, 
  } = route;
  return {
    route: { 
      key, path, title, category, 
    }, 
  };
});

export const setClientSize = createAction(
  SET_CLIENT_SIZE,
  (width, height) => ({ width, height }),
);

export const setUrl = createAction(
  SET_URL,
  url => ({ url }),
);
