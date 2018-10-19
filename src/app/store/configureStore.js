/* eslint-disable global-require */
import { createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from './reducer';
import listeners from './listeners';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers();

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // listens other redux-store value
  const currentValues = {};
  store.subscribe(() => {
    listeners.forEach((self, i) => {
      const { select, handler } = self;
      const previousValue = currentValues[i];
      currentValues[i] = select(store.getState());      
      if (previousValue !== currentValues[i]) {
        handler(previousValue, currentValues[i], store, {
          ...self,
          _id: Math.random().toString(36).substr(-6),
        });
      }
    });
  });
  // // listens other redux-store value

  const persistor = persistStore(store);
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return { store, persistor };  
}
