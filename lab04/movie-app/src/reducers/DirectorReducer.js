export const movieReducer = (state = [], action) => {
    switch(action.type) {
        case 'DIRECTOR_ADD':
            return [...state, action.payload];
        case 'DIRECTOR_EDIT':
            return state;
        default: 
            return state;
    }
};