// export const getUsers = state => state.users;

export const getAllUsers = (state) => {
    console.log("aaa", state);
    return state.entities.users.allIds
    .map(id => state.entities.users.byId[id]);
}