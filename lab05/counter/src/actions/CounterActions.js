
export const incrementCounterAction = (payload) => ({
    type: 'COUNTER_INCREMENT',
    payload
});

export const decrementCounterAction = (payload) => ({
    type: 'COUNTER_DECREMENT',
    payload
});

export const startCounterAction = (payload) => ({
    type: 'COUNTER_START',
    payload
});

export const stopCounterAction = (payload) => ({
    type: 'COUNTER_STOP',
    payload
});