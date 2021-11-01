import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from "./reducers/RootReducer";
import {addMovieAction} from './actions/MovieActions';
import {addDirectorAction} from './actions/DirectorActions';

let store = createStore(rootReducer);

store.dispatch(addMovieAction({id: '1', title: "movie1", productionYear: 2000, directorId: "-1"}))
store.dispatch(addMovieAction({id: '2', title: "movie2", productionYear: 2001, directorId: "-1"}))
store.dispatch(addMovieAction({id: '3', title: "movie3", productionYear: 2002, directorId: "-1"}))
store.dispatch(addDirectorAction({id: '1', firstName: "Jan", lastName: "Kowalski", age: 40}))
store.dispatch(addDirectorAction({id: '2', firstName: "Janek", lastName: "Kowal", age: 35}))

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
