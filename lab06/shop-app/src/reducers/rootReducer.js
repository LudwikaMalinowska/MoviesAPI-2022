import { combineReducers } from "redux";
import userReducer  from "./UserReducer";
import productReducer from "./ProductReducer";

const rootReducer = combineReducers({
    users: userReducer,
    products: productReducer,
});

export default rootReducer;