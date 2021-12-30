import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';


const movieSchema = new schema.Entity('movies');
const moviesSchema = [movieSchema];




export const getMovieList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/api/movies',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            'MOVIE_LIST_REQUEST_START',
            {
                type: 'MOVIE_LIST_REQUEST_SUCCESS',
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, moviesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           'MOVIE_LIST_REQUEST_FAILED'
        ]
    })
}

export const getMovie = (movieId) => {
    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movieId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            'MOVIE_REQUEST_START',
            {
                type: 'MOVIE_REQUEST_SUCCESS',
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, moviesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           'MOVIE_REQUEST_FAILED'
        ]
    })
}

export const createMovie = (newMovie) => {
    //  console.log("newpr: ", newProduct);
    return createAction({
        endpoint: 'http://localhost:5000/api/movies',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie),
        types: [
            'MOVIE_CREATE_START',
            {
                type: 'MOVIE_CREATE_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(newMovie, movieSchema);
                    return entities;
                },
                meta: { actionType: 'ADD' }
           },
            'MOVIE_CREATE_FAILURE'
        ]
    })
}

export const editMovie = (editedMovie) => {

    return createAction({
        endpoint: `http://localhost:5000/api/movies/${editedMovie.id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedMovie),
        types: [
            'MOVIE_EDIT_START',
            {
                type: 'MOVIE_EDIT_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(editedMovie, movieSchema);
                    return entities;
                },
                meta: { actionType: 'EDIT' }
           },
            'MOVIE_EDIT_FAILURE'
        ]
    })
}

export const deleteMovie = (movieToDelete) => {

    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movieToDelete.id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieToDelete),
        types: [
            'MOVIE_DELETE_START',
            {
                type: 'MOVIE_DELETE_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(movieToDelete, movieSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
           },
            'MOVIE_DELETE_FAILURE'
        ]
    })
}

export const setMovieDirector = (movieId, person) => {

    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movieId}/director`,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person),
        types: [
            'MOVIE_DIRECTOR_SET_START',
            {
                type: 'MOVIE_DIRECTOR_SET_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(person, movieSchema);
                    return entities;
                },
                meta: { actionType: 'PATCH' }
           },
           'MOVIE_DIRECTOR_SET_FAILURE'
        ]
    })
}