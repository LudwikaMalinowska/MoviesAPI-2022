export const getAllMovies = (state) => {
    return state.entities.movies.allIds
    .map(id => state.entities.movies.byId[id]);
}