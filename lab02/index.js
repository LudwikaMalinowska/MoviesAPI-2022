const Redux = require('redux');

function todoReducer(state = {todos: []}, action) {
    //console.log(state);
    const todosCopy = [...state.todos];
    let todoIndex;
    switch(action.type) {
        case 'ADD_TODO':
            return {...state, todos: [...state.todos, action.payload]}
        case 'DELETE_TODO':
            const newTodos = state.todos.filter(todo => todo.id !== action.payload.id);
            return {...state, todos: newTodos};
        case 'UPDATE_TODO':
            //const todosCopy = [...state.todos];
            todoIndex = todosCopy.findIndex(todo => todo.id === action.payload.id)
            const data = action.payload
            todosCopy[todoIndex].title = data.title;
            todosCopy[todoIndex].done = data.done;
            return {...state, todos: todosCopy};
        case 'FINISH_TODO':
            const id = action.payload.id;
            // const todosCopy = [...state.todos];
            todoIndex = todosCopy.findIndex(todo => todo.id === id)
            todosCopy[todoIndex].done = true;
            return {...state, todos: todosCopy}
        default:
            return {...state}
    }
}


function notesReducer(state = {notes: []}, action) {
    //console.log(state);
    switch(action.type) {
        case 'ADD_NOTE':
            return {...state, notes: [...state.notes, action.payload]}
        case 'DELETE_NOTE':
            const newNotes = state.notes.filter(note => note.id !== action.payload.id)
            return {...state, notes: newNotes};
        default:
            return {...state}
    }
}



let store = Redux.createStore(Redux.combineReducers({todos: todoReducer, notes: notesReducer}));

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
