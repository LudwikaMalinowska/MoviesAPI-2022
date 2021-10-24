export const addTodoAction = (payload) => ({
    type: 'TODO_ADD',
    payload
});

export const deleteTodoAction = (payload) => ({
    type: 'TODO_DELETE',
    payload
})

export const editTodoAction = (payload) => ({
    type: 'TODO_EDIT',
    payload
})

export const finishTodoAction = (payload) => ({
    type: 'TODO_DONE',
    payload
})