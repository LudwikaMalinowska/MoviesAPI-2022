import { combineReducers } from "redux";
import userReducer  from "../users/UserReducer";
import productReducer from "../products/ProductReducer";

const rootReducer = combineReducers({
    users: userReducer,
    products: productReducer,
});

export default rootReducer;