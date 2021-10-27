export const movieReducer = (state = [], action) => {
    switch(action.type) {
        case 'MOVIE_ADD':
            return [...state, action.payload];
        default: 
            return state;
    }
};