import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware, compose } from 'redux';
// import { loadState, saveState } from './local-storage';
// import { appReducer } from './reducers/appReducer';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

// const composeEnhancers = typeof window === 'object' &&
//   window.REDUX_DEVTOOLS_EXTENSION_COMPOSE ?
//   window.REDUX_DEVTOOLS_EXTENSION_COMPOSE({}) :
//   compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const initialState = loadState();
// const store = createStore(initialState, enhancer);

// store.subscribe(() => {
//   saveState({
//     invoices: store.getState().invoices,
//   });
// });

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root'),
// );
// registerServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

