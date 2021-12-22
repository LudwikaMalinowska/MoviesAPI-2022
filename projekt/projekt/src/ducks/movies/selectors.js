export const getAllMovies = (state) => {
    // console.log("aaa", state);
    return state.entities.movies.allIds
    .map(id => state.entities.movies.byId[id]);
}