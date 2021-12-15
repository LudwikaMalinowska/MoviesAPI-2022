import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';
import axios from "axios";

import {productListRequestAction, productListRequestFailAction, productListRequestStartAction} from "../actions/ProductActions";

const userSchema = new schema.Entity('users');
const usersSchema = [userSchema];



// state => dispatch => action

export const getProductList = () => {
    return async dispatch => {
        dispatch(productListRequestStartAction);
        console.log('Create product action');
        setTimeout(async () => {
            try{
                const response = await axios.get('https://fakestoreapi.com/products');
                dispatch(productListRequestAction(response.data));        
            }catch(ex) {
                dispatch(productListRequestFailAction(ex));
            }
        }, 4000)
    }
}