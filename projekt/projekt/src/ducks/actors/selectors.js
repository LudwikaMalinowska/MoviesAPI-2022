export const getAllActors = (state) => {
    // console.log("aaa", state);
    return state.entities.actors.allIds
    .map(id => state.entities.persons.byId[id]);
}