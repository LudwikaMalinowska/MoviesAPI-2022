import { combineReducers } from "redux";
import { directorReducer } from "./DirectorReducer";
import { movieReducer } from "./MovieReducer";
import {actorReducer} from "./ActorReducer";

const rootReducer = combineReducers({
    movies: movieReducer,
    directors: directorReducer,
    actors: actorReducer
});

export default rootReducer;