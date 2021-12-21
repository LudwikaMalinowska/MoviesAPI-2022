import { USER_LIST_REQUEST, USER_LIST_REQUEST_FAILED, USER_LIST_REQUEST_START } from "../actions/UserActions";

const initState = {
    users: [],
    loading: false,
    error: ''
}

const userReducer = (state = [], action) => {
    switch(action.type) {
        case USER_LIST_REQUEST_START: 
            // return { ...state, loading: true }
            return [...action.payload];
        case USER_LIST_REQUEST_FAILED:
            // return { ...state, loading: false, error: action.payload }
            return [...state, action.payload]
        case USER_LIST_REQUEST:
            console.log("ac payload: ", action.payload);
            // return {...state, users: action.payload, loading: false };
            return [...state, action.payload]
        default:
            return state;
    }
}

export default userReducer;