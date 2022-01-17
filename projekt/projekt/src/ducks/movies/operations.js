import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';
import types from "./types";

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
            types.MOVIE_LIST_REQUEST_START,
            {
                type: types.MOVIE_LIST_REQUEST_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, moviesSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           {
               type: types.MOVIE_LIST_REQUEST_FAILED,
               meta: { actionType: 'FAILURE' }
           }
           
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
            types.MOVIE_REQUEST_START,
            {
                type: types.MOVIE_REQUEST_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, movieSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.MOVIE_REQUEST_FAILED
        ]
    })
}

export const createMovie = (newMovie) => {
    return createAction({
        endpoint: 'http://localhost:5000/api/movies',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie),
        types: [
            types.MOVIE_CREATE_START,
            {
                type: types.MOVIE_CREATE_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, movieSchema);
                    return entities;
                },
                meta: { actionType: 'ADD' }
           },
            types.MOVIE_CREATE_FAILURE
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
            types.MOVIE_EDIT_START,
            {
                type: types.MOVIE_EDIT_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, movieSchema);
                    return entities;
                },
                meta: { actionType: 'EDIT' }
           },
            types.MOVIE_EDIT_FAILURE
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
            types.MOVIE_DELETE_START,
            {
                type: types.MOVIE_DELETE_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(movieToDelete, movieSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
           },
            types.MOVIE_DELETE_FAILURE
        ]
    })
}

export const setMovieDirector = (movie, director) => {

    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movie.id}/director`,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(director),
        types: [
            types.MOVIE_DIRECTOR_SET_START,
            {
                type: types.MOVIE_DIRECTOR_SET_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(movie, movieSchema);
                    return entities;
                },
                meta: { actionType: 'PATCH' }
           },
           types.MOVIE_DIRECTOR_SET_FAILURE
        ]
    })
}