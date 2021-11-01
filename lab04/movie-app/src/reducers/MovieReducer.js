export const movieReducer = (state = [], action) => {
    let newMovies;
    let index;
    switch(action.type) {
        
        case 'MOVIE_ADD':
            return [...state, action.payload];
        case 'MOVIE_DELETE':
            newMovies = state.filter(movie => movie.id !== action.payload.id)
            return newMovies;
        case 'MOVIE_EDIT':
            // console.log(action.payload);
            newMovies = [...state];
            const editedMovie = action.payload;
            index = newMovies.findIndex(movie => movie.id === editedMovie.id);

            newMovies[index].title = editedMovie.title;
            newMovies[index].productionYear = editedMovie.productionYear;
            newMovies[index].directorId = editedMovie.directorId;
            // console.log(newMovies);
            return newMovies;
        default: 
            return state;
    }
};