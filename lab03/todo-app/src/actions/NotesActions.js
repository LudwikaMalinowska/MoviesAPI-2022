export const addNoteAction = (payload) => ({
    type: 'NOTE_ADD',
    payload
});

export const deleteNoteAction = (payload) => ({
    type: 'NOTE_DELETE',
    payload
})

export const editNoteAction = (payload) => ({
    type: 'NOTE_EDIT',
    payload
})
