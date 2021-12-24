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