function todoReducer(state = [], action) {
    //console.log(state);
    const todosCopy = [...state];
    let todoIndex;
    switch(action.type) {
        case 'ADD_TODO':
            return [...state, action.payload]
        case 'DELETE_TODO':
            const newTodos = state.filter(todo => todo.id !== action.payload.id);
            return newTodos;
        case 'UPDATE_TODO':
            //const todosCopy = [...state.todos];
            todoIndex = todosCopy.findIndex(todo => todo.id === action.payload.id)
            const data = action.payload
            todosCopy[todoIndex].title = data.title;
            todosCopy[todoIndex].done = data.done;
            return todosCopy;
        case 'FINISH_TODO':
            const id = action.payload.id;
            // const todosCopy = [...state.todos];
            todoIndex = todosCopy.findIndex(todo => todo.id === id)
            todosCopy[todoIndex].done = true;
            return todosCopy;
        default:
            return state;
    }
}

module.exports = todoReducer;