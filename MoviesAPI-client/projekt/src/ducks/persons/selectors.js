export const getAllPersons = (state) => {
    return state.entities.persons.allIds
    .map(id => state.entities.persons.byId[id]);
}