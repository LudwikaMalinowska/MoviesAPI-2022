

const personReducer = (state = [], action) => {
    switch(action.type) {
        case 'PERSON_LIST_REQUEST_START': 
            return [...action.payload];
        case 'PERSON_LIST_REQUEST_FAILED':
            return [...state, action.payload]
        case 'PERSON_LIST_REQUEST':
            // console.log("ac payload: ", action.payload);
            return [...state, action.payload]
        default:
            return state;
    }
}

export default personReducer;