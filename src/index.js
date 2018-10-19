import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FastClick from 'fastclick';
// import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from './app/shared/useToastify';
import configureStore from './app/store/configureStore';
import { getRoutes } from './app';
import { setStore } from './app/shared/helpers/util';
import { unregister } from './registerServiceWorker';
import Error from './app/screens/Misc/screens/Error';
import AppChecker from './app/shared/components/AppChecker';
import './app/shared/styles/bootstrap.scss';
import './app/shared/styles/common.scss';

const { store, persistor } = configureStore();

const Routes = getRoutes(store);

const setup = async () => {
  setStore(store);
  try {
    // do some ex
    // const response = await axios('/api/users/me');
    // const { provider, user } = response.data;
    // if (user) {
    //   store.dispatch(userLogin(user));
    // }
    // // alert('success');
    // store.dispatch(setProvider(provider));

    FastClick.attach(document.body);

    ReactDOM.render(
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <Fragment>
            <Router>
              <Routes />
            </Router>
            <ToastContainer />
            <AppChecker />
          </Fragment>
        </PersistGate>
      </Provider>,
      document.getElementById('root'),
    );
    unregister();
  } catch (err) {
    ReactDOM.render(
      <Error err={err} />,
      document.getElementById('root'),
    );
  }
  return true;
};

setup();
