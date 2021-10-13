// function notesReducer(state = {todos: [], notes: []}, action) {
//     //console.log(state);
//     const todosCopy = [...state.todos];
//     let todoIndex;
//     switch(action.type) {
//         case 'ADD_NOTE':
//             return {...state, notes: [...state.notes, action.payload]}
//         case 'DELETE_NOTE':
//             const newNotes = state.notes.filter(note => note.id !== action.payload.id)
//             return {...state, notes: newNotes};
//         default:
//             return {...state}
//     }
// }