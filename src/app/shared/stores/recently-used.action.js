import { createAction } from 'redux-actions';
import {
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR,
} from './recently-used.action-type';

export const addItem = createAction(
  ADD_ITEM,
  (namespace, item, count) => ({ namespace, item, count }),
);

export const removeItem = createAction(
  REMOVE_ITEM,
  (namespace, item) => ({ namespace, item }),
);

export const clear = createAction(CLEAR, namespace => ({ namespace }));
