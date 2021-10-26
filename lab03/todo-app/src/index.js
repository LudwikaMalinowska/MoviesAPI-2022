import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/RootReducer';
import { addTodoAction } from './actions/TodoActions';
import {v4 as uuidv4 } from 'uuid';
import {BrowserRouter as Router} from 'react-router-dom';
import { addNoteAction } from './actions/NotesActions';


let store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch(addTodoAction({id: 1, name: 'todo1', date: '2021-10-24', done: false}));
store.dispatch(addTodoAction({id: 2, name: 'todo2', date: '2021-10-26', done: true}));

store.dispatch(addNoteAction({id: 1, content: "Notatka nr 1"}))
store.dispatch(addNoteAction({id: 2, content: "Notatka nr 2"}))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <App />
    </Router>
      
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);