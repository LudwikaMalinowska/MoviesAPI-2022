

const actorReducer = (state = [], action) => {
    switch(action.type) {
        case 'ACTOR_LIST_REQUEST_START': 
            return [...action.payload];
        case 'ACTOR_LIST_REQUEST_FAILED':
            return [...state, action.payload]
        case 'ACTOR_LIST_REQUEST_SUCCESS':
            // console.log("ac payload: ", action.payload);
            return [...state, action.payload]

        case 'MOVIE_ACTORS_REQUEST_START':
            return [...action.payload];
        case 'MOVIE_ACTORS_REQUEST_FAILED':
            return [...state, action.payload];
        case 'MOVIE_ACTORS_REQUEST_SUCCESS':
            return [...state, action.payload];

        case 'MOVIE_ACTOR_ADD_START':
            return [...action.payload];
        case 'MOVIE_ACTOR_ADD_FAILURE':
            return [...state, action.payload];
        case 'MOVIE_ACTOR_ADD_SUCCESS':
            return [...state, action.payload];

        case 'MOVIE_ACTOR_DELETE_START':
            return [...action.payload];
        case 'MOVIE_ACTOR_DELETE_FAILURE':
            return [...state, action.payload];
        case 'MOVIE_ACTOR_DELETE_SUCCESS':
            return [...state, action.payload];
        
        

        default:
            return state;
    }
}

export default actorReducer;