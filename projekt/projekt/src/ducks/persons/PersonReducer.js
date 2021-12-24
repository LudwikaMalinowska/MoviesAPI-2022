

const personReducer = (state = [], action) => {
    switch(action.type) {
        case 'PERSON_LIST_REQUEST_START': 
            return [...action.payload];
        case 'PERSON_LIST_REQUEST_FAILED':
            return [...state, action.payload]
        case 'PERSON_LIST_REQUEST_SUCCESS':
            return [...state, action.payload]

        case 'PERSON_CREATE_START':
            return [...action.payload];
        case 'PERSON_CREATE_FAILURE':
            return [...state, action.payload]
        case 'PERSON_CREATE_SUCCESS':
            return [...state, action.payload]

        case 'PERSON_EDIT_START':
            return [...action.payload];
        case 'PERSON_EDIT_FAILURE':
            return [...state, action.payload]
        case 'PERSON_EDIT_SUCCESS':
            return [...state, action.payload]

        default:
            return state;
    }
}

export default personReducer;