export const todoReducer = (state = [], action) => {
    console.log(state)
    switch(action.type) {
        case 'TODO_ADD':
            return [...state, action.payload];
        case 'TODO_DELETE':
            const newTodos = state.filter(todo => todo.id !== action.payload.id)
            return newTodos;
        default:
            return state;
    }
}
