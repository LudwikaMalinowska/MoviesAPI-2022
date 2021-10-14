const Redux = require('redux');
const rootReducer = require('./reducers/rootReducer.js')



let store = Redux.createStore(rootReducer);

store.subscribe(() => console.log(store.getState()));

store.dispatch({type: 'ADD_TODO', payload: {id: 1, title: 'tytul', done: false}});
store.dispatch({type: 'ADD_TODO', payload: {id: 2, title: 'tytul2', done: false}});
store.dispatch({type: 'ADD_TODO', payload: {id: 3, title: 'tytul3', done: false}});

store.dispatch({type: 'DELETE_TODO', payload: {id: 3}})
store.dispatch({type: 'UPDATE_TODO', payload: {id: 2, title: 'bez tytulu', done: true}})
store.dispatch({type: 'FINISH_TODO', payload: {id: 1}})

store.dispatch({type: 'ADD_NOTE', payload: {id: 1, content: "notatka1"}})
store.dispatch({type: 'ADD_NOTE', payload: {id: 2, content: "notatka2"}})
store.dispatch({type: 'DELETE_NOTE', payload: {id: 2}})
