export const todoReducer = (state = [], action) => {
    // console.log(state)
    let newTodos;
    let index;
    switch(action.type) {
        case 'TODO_ADD':
            return [...state, action.payload];
        case 'TODO_DELETE':
            newTodos = state.filter(todo => todo.id !== action.payload.id)
            return newTodos;
        case 'TODO_DONE':
            newTodos = [...state]
            index = newTodos.findIndex(todo => todo.id === action.payload.id)
            newTodos[index].done = true;
            return newTodos;
        case 'TODO_EDIT':
            newTodos = [...state]
            index = newTodos.findIndex(todo => todo.id === action.payload.id)
            // console.log("payload:", action.payload);
            const newValues = action.payload;
            newTodos[index].name = newValues.name;
            newTodos[index].date = newValues.date;
            newTodos[index].done = newValues.done;
            return newTodos;

        default:
            return state;
    }
}
