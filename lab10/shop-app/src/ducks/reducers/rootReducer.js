import { combineReducers } from "redux";
import userReducer  from "../users/UserReducer";
import productReducer from "../products/ProductReducer";
import {entities} from "../entities/reducers"

// const rootReducer = combineReducers({
//     users: userReducer,
//     products: productReducer,
// });

const rootReducer = combineReducers({
    entities: entities
});



export default rootReducer;