import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { todoReducer } from './reducers/TodoReducer';

let store = createStore(todoReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);