import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { todoReducer } from './reducers/TodoReducer';
import { addTodoAction } from './actions/TodoActions';
import {v4 as uuidv4 } from 'uuid';

let store = createStore(todoReducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch(addTodoAction({id: uuidv4(), name: '', date: '', done: false}));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);