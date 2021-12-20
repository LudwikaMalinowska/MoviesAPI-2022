

const movieReducer = (state = [], action) => {
    switch(action.type) {
        case 'MOVIE_LIST_REQUEST_START': 
            return [...action.payload];
        case 'MOVIE_LIST_REQUEST_FAILED':
            return [...state, action.payload]
        case 'MOVIE_LIST_REQUEST_SUCCESS':
            // console.log("ac payload: ", action.payload);
            return [...state, action.payload]
        default:
            return state;
    }
}

export default movieReducer;