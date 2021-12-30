

const movieReducer = (state = [], action) => {
    switch(action.type) {
        case 'MOVIE_LIST_REQUEST_START': 
            return [...action.payload];
        case 'MOVIE_LIST_REQUEST_FAILED':
            return [...state, action.payload]
        case 'MOVIE_LIST_REQUEST_SUCCESS':
            return [...state, action.payload]
            
        case 'MOVIE_CREATE_START':
            return [...action.payload];
        case 'MOVIE_CREATE_FAILURE':
            return [...state, action.payload];
        case 'MOVIE_CREATE_SUCCESS':
            return [...state, action.payload]

        case 'MOVIE_EDIT_START':
            return [...action.payload];
        case 'MOVIE_EDIT_FAILURE':
            return [...state, action.payload];
        case 'MOVIE_EDIT_SUCCESS':
            return [...state, action.payload];
        
        case 'MOVIE_DELETE_START':
            return [...action.payload];
        case 'MOVIE_DELETE_FAILURE':
            return [...state, action.payload];
        case 'MOVIE_DELETE_SUCCESS':
            return [...state, action.payload];
        
        case 'MOVIE_DIRECTOR_SET_START':
            return [...action.payload];
        case 'MOVIE_DIRECTOR_SET_FAILURE':
            return [...state, action.payload];
       case 'MOVIE_DIRECTOR_SET_SUCCESS':
            return [...state, action.payload];

        case 'MOVIE_REQUEST_START':
            return [...action.payload];
        case 'MOVIE_REQUEST_FAILED':
            return [...state, action.payload];
        case 'MOVIE_REQUEST_SUCCESS':
            return [...state, action.payload];
        

        default:
            return state;
    }
}

export default movieReducer;