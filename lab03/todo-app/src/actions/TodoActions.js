export const addTodoAction = (payload) => ({
    type: 'TODO_ADD',
    payload
});

export const deleteTodoAction = (payload) => ({
    type: 'TODO_DELETE',
    payload
})