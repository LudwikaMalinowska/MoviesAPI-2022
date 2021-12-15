import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';
import axios from "axios";

import {usersListRequestStartAction, usersListRequestAction, usersListRequestFailAction} from '../actions/UserActions'

const userSchema = new schema.Entity('users');
const usersSchema = [userSchema];



export const getUserList = () => {
    return async dispatch => {
        dispatch(usersListRequestStartAction);
        console.log('Create user action');
        setTimeout(async () => {
            try{
                const response = await axios.get('https://fakestoreapi.com/users');
                dispatch(usersListRequestAction(response.data));        
            }catch(ex) {
                dispatch(usersListRequestFailAction(ex));
            }
        }, 4000)
    }
}