
const initialState = {
    counter: 0,
    counting: false
};

export const counterReducer = (state = initialState , action) => {
    let newState, number, counter;
    switch(action.type) {
        case 'COUNTER_INCREMENT':
            number = action.payload;
            counter = state.counter;
            return {...state, 
                counter: counter + number};
        case 'COUNTER_DECREMENT':
            number = action.payload;
            counter = state.counter;
            return {...state, 
            counter: counter - number};
        case 'COUNTER_START':
            console.log("start");
            newState = {...state,
            counting: true}
            return newState;
        case 'COUNTER_STOP':
            newState = {...state,
            counting: false}
            return newState;
        default: 
            return state;
    }
};