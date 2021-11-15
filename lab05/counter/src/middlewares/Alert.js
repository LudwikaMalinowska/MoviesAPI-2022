import {decrementCounterAction} from '../actions/CounterActions';

const logger = store => next => action => {
    console.log('Dispatching action', action);
    console.log('State before', store.getState());

    // alert("Inkrementuje licznik")

    let state = store.getState();
    
    if (action.type === 'COUNTER_START') {
        if (window.myInterval === undefined) {
            window.myInterval = setInterval(() => {
                next(decrementCounterAction(1));
            }, 1000);
        }
        
        
    }
    else if (action.type === "COUNTER_STOP") {
        window.clearInterval(window.myInterval);
    }
    
    let result = next(action);
    console.log('State after', store.getState());
    return result;
}

export default logger;