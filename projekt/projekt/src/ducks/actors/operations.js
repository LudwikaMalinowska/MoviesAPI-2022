import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';
import types from "./types";
const axios = require('axios');


const actorSchema = new schema.Entity('actors');
const actorsSchema = [actorSchema];




export const getActorList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/api/actors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.ACTORS_LIST_REQUEST_START,
            {
                type: types.ACTORS_LIST_REQUEST_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, actorsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.ACTORS_LIST_REQUEST_FAILED
        ]
    })
}


export const getMovieActors = (movieId) => {
    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movieId}/actors`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        types: [
            types.MOVIE_ACTORS_REQUEST_START,
            {
                type: types.MOVIE_ACTORS_REQUEST_SUCCESS,
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, actorsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           types.MOVIE_ACTORS_REQUEST_FAILED
        ]
    })
}

export const addActor = (movieId, actor) => {
    console.log(movieId, actor);
    return createAction({
        endpoint: `http://localhost:5000/api/movies/${movieId}/actors`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actor),
        types: [
            types.MOVIE_ACTOR_ADD_START,
            {
                type: types.MOVIE_ACTOR_ADD_SUCCESS,
                payload: async (action, state, res) => {
                    const json = await res.json();
                    const { entities } = normalize(json, actorSchema);
                    console.log("ad");
                    return entities;
                },
                meta: { actionType: 'ADD' }
           },
            types.MOVIE_ACTOR_ADD_FAILURE
        ]
    })
}

export const deleteMovieActor = (actor) => {

    return createAction({
        endpoint: `http://localhost:5000/api/movies/${actor.movie_id}/actors/${actor.person_id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(actor),
        types: [
            types.MOVIE_ACTOR_DELETE_START,
            {
                type: types.MOVIE_ACTOR_DELETE_SUCCESS,
                payload: async (action, state, res) => {
                    const { entities } = normalize(actor, actorSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
           },
            types.MOVIE_ACTOR_DELETE_FAILURE
        ]
    })
}

// export const getMovieActors = (movieId) => {
//     axios.get(`http://localhost:5000/api/movies/${movieId}/actors`)
//     .then(function (response) {
//       // handle success
//       console.log("mactors response: ", response.data);
//       return response.data;
//     })
// } 
