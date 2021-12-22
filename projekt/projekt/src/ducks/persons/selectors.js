export const getAllPersons = (state) => {
    // console.log("aaa", state);
    return state.entities.persons.allIds
    .map(id => state.entities.persons.byId[id]);
}