import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';
import axios from "axios";

import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_REQUEST_FAILED, PRODUCT_LIST_REQUEST_START} from "../actions/ProductActions";


const productSchema = new schema.Entity('products');
const productsSchema = [productSchema];



// state => dispatch => action

// export const getProductList = () => {
//     return async dispatch => {
//         dispatch(productListRequestStartAction);
//         console.log('Create product action');
//         setTimeout(async () => {
//             try{
//                 const response = await axios.get('https://fakestoreapi.com/products');
//                 dispatch(productListRequestAction(response.data));        
//             }catch(ex) {
//                 dispatch(productListRequestFailAction(ex));
//             }
//         }, 4000)
//     }
// }

export const getProductList = () => {
    return createAction({
        endpoint: 'https://fakestoreapi.com/products',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            PRODUCT_LIST_REQUEST_START,
            {
                type: PRODUCT_LIST_REQUEST,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, productsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           PRODUCT_LIST_REQUEST_FAILED
        ]
    })
}