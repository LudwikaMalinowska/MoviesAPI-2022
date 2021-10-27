import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import { movieReducer } from './reducers/MovieReducer';
import {addMovieAction} from './actions/MovieActions';
import {addDirectorAction} from './actions/DirectorActions';

let store = createStore(movieReducer);

store.dispatch(addMovieAction({id: 1, title: "movie1", productionYear: 2000}))
store.dispatch(addDirectorAction({id: 1, firstName: "Jan", lastName: "Kowalski", age: 40}))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
