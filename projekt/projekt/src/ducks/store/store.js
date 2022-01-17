import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

import logger from 'redux-logger';
import { createMiddleware } from 'redux-api-middleware';
import failureCatcher from "../middlewares/ActionFailureCatcher";

import {entities} from "../entities/reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const combinedReducers = combineReducers({
  entities: entities,
});



const store = createStore(combinedReducers, 
  composeEnhancers(applyMiddleware(thunk, createMiddleware(), logger, failureCatcher)),
);

export default store;