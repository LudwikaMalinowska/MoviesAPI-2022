import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';
import axios from "axios";

import {usersListRequestStartAction, usersListRequestAction, usersListRequestFailAction} from '../actions/UserActions';


import { USER_LIST_REQUEST, USER_LIST_REQUEST_FAILED, USER_LIST_REQUEST_START, USER_LIST_REQUEST_SUCCESS } from "../actions/UserActions";

const userSchema = new schema.Entity('users');
const usersSchema = [userSchema];



// export const getUserList = () => {
//     return async dispatch => {
//         dispatch(usersListRequestStartAction);
//         console.log('Create user action');
//         setTimeout(async () => {
//             try{
//                 const response = await axios.get('https://fakestoreapi.com/users');
//                 dispatch(usersListRequestAction(response.data));        
//             }catch(ex) {
//                 dispatch(usersListRequestFailAction(ex));
//             }
//         }, 4000)
//     }
// }

export const getUserList = () => {
    return createAction({
        endpoint: 'https://fakestoreapi.com/users',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            USER_LIST_REQUEST_START,
            {
                type: USER_LIST_REQUEST,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, usersSchema)
                    return entities;
                },
                meta: {actionType: "GET_ALL"}
            },
            USER_LIST_REQUEST_FAILED
        ]
    })
}