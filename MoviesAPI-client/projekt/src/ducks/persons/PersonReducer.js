import types from "./types";

const personReducer = (state = [], action) => {
    switch(action.type) {
        case types.PERSON_LIST_REQUEST_START: 
            return [...action.payload];
        case types.PERSON_LIST_REQUEST_FAILED:
            return [...state, action.payload];
        case types.PERSON_LIST_REQUEST_SUCCESS:
            return [...state, action.payload];

        case types.PERSON_CREATE_START:
            return [...action.payload];
        case types.PERSON_CREATE_FAILURE:
            return [...state, action.payload];
        case types.PERSON_CREATE_SUCCESS:
            return [...state, action.payload];

        case types.PERSON_EDIT_START:
            return [...action.payload];
        case types.PERSON_EDIT_FAILURE:
            return [...state, action.payload];
        case types.PERSON_EDIT_SUCCESS:
            return [...state, action.payload];

        case types.PERSON_DELETE_START:
            return [...action.payload];
        case types.PERSON_DELETE_FAILURE:
            return [...state, action.payload];
        case types.PERSON_DELETE_SUCCESS:
            return [...state, action.payload];

        case types.PERSON_REQUEST_START:
            return [...action.payload];
        case types.PERSON_REQUEST_FAILED:
            return [...state, action.payload];
        case types.PERSON_REQUEST_SUCCESS:
            return [...state, action.payload];
        
        
        default:
            return state;
    }
}

export default personReducer;