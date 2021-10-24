export const notesReducer = (state = [], action) => {
    
    let newNotes;
    let index;

    switch(action.type) {
        case 'NOTE_ADD':
            return [...state, action.payload];
        case 'NOTE_DELETE':
            newNotes = state.filter(note => note.id !== action.payload.id)
            return newNotes;
        case 'NOTE_EDIT':
            newNotes = [...state]
            index = newNotes.findIndex(todo => todo.id === action.payload.id)
            console.log("payload:", action.payload);
            const newValues = action.payload;
            newNotes[index].content = newValues.content;
            return newNotes;
        default:
            return state;
    }
}

