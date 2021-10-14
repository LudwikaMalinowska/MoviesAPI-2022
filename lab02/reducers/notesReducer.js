function notesReducer(state = [], action) {
    //console.log(state);
    let todoIndex;
    switch(action.type) {
        case 'ADD_NOTE':
            return [...state, action.payload];
        case 'DELETE_NOTE':
            const newNotes = state.filter(note => note.id !== action.payload.id)
            return newNotes;
        default:
            return state;
    }
}

module.exports = notesReducer;