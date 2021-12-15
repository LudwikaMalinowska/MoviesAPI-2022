import { USER_LIST_REQUEST, USER_LIST_REQUEST_FAILED, USER_LIST_REQUEST_START } from "../actions/UserActions";

const initState = {
    users: [],
    loading: false,
    error: ''
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST_START: 
            return { ...state, loading: true }
        case USER_LIST_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload }
        case USER_LIST_REQUEST:
            return {...state, users: [...action.payload], loading: false };
        default:
            return state;
    }
}

export default userReducer;