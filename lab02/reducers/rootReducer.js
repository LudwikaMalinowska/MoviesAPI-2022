const { combineReducers } = require("redux");
const todoReducer = require('./todoReducer.js');
const notesReducer = require('./notesReducer.js');

const rootReducer = combineReducers({
    todos: todoReducer,
    notes: notesReducer
});

module.exports = rootReducer;
