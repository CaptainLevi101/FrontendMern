import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
 //keeps track of the store
//that allows us to access the store from anywhere in parent component or child component

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//

import reducers from './reducers';
import App from './App';
// import './index.css';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);