import { combineReducers } from "redux";
import { directorReducer } from "./DirectorReducer";
import { movieReducer } from "./MovieReducer";

const rootReducer = combineReducers({
    movies: movieReducer,
    directors: directorReducer
});

export default rootReducer;