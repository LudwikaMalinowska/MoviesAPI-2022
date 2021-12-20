import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';


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
            'ACTORS_LIST_REQUEST_START',
            {
                type: 'ACTORS_LIST_REQUEST_SUCCESS',
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, actorsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           'ACTORS_LIST_REQUEST_FAILED'
        ]
    })
}

