import { combineReducers } from "redux";
import {todoReducer} from './TodoReducer.js';
import {notesReducer} from './NotesReducer.js';

const rootReducer = combineReducers({
    todos: todoReducer,
    notes: notesReducer
});

export default rootReducer;
