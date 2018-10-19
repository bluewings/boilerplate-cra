/* eslint-disable no-restricted-globals */
import { Map } from 'immutable';
import parse from 'url-parse';
import stringify from 'json-stable-stringify';
import {
  ROUTE_CHANGE,
  SET_CLIENT_SIZE,
  SET_URL,
} from './app.action-type';

const initialState = Map({
  env: process.env.NODE_ENV,
  route: null,
  clientSize: {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  },
  url: parse(location.href),
});

export default (prevState, { type, payload }) => {
  const state = Map.isMap(prevState) ? prevState : initialState;
  switch (type) {
    case ROUTE_CHANGE: {
      const { route } = payload;
      return state.set('route', route);
    }

    case SET_CLIENT_SIZE: {
      const { width, height } = payload;
      return state.setIn(['clientSize', 'width'], width)
        .setIn(['clientSize', 'height'], height);
    }

    case SET_URL: {
      const { url } = payload;
      const parsed = parse(url);
      if (stringify(state.get('url')) !== stringify(parsed)) {
        return state.set('url', parsed);
      }
      return state;
    }

    default:
      return state;
  }
};
