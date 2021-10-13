// export default function todoReducer(state = {todos: [], notes: []}, action) {
//     //console.log(state);
//     const todosCopy = [...state.todos];
//     let todoIndex;
//     switch(action.type) {
//         case 'ADD_TODO':
//             return {...state, todos: [...state.todos, action.payload]}
//         case 'DELETE_TODO':
//             const newTodos = state.todos.filter(todo => todo.id !== action.payload.id);
//             return {...state, todos: newTodos};
//         case 'UPDATE_TODO':
//             //const todosCopy = [...state.todos];
//             todoIndex = todosCopy.findIndex(todo => todo.id === action.payload.id)
//             const data = action.payload
//             todosCopy[todoIndex].title = data.title;
//             todosCopy[todoIndex].done = data.done;
//             return {...state, todos: todosCopy};
//         case 'FINISH_TODO':
//             const id = action.payload.id;
//             // const todosCopy = [...state.todos];
//             todoIndex = todosCopy.findIndex(todo => todo.id === id)
//             todosCopy[todoIndex].done = true;
//             return {...state, todos: todosCopy}
//         default:
//             return {...state}
//     }
// }