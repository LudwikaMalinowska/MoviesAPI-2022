
export const counterReducer = (state = 0, action) => {
    switch(action.type) {
        case 'COUNTER_INCREMENT':
            const number = action.payload;
            return state+number;
        default: 
            return state;
    }
};