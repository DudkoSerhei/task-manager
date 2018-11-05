import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { loadState, saveState } from './local-storage';
import appReducer from './reducers/appReducer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
  compose;
/* eslint-enable */

const enhancer = composeEnhancers(applyMiddleware(thunk));
const initialState = loadState();
const store = createStore(appReducer, initialState, enhancer);

store.subscribe(() => {
  saveState({
    invoices: store.getState().invoices,
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
