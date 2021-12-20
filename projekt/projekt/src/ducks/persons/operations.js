import { createAction } from "redux-api-middleware"
import { schema, normalize} from 'normalizr';

const personSchema = new schema.Entity('persons');
const personsSchema = [personSchema];




export const getPersonList = () => {
    return createAction({
        endpoint: 'http://localhost:5000/api/persons',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        types: [
            'PERSON_LIST_REQUEST_START',
            {
                type: 'PERSON_LIST_REQUEST_SUCCESS',
                payload: async (action, state, res) => {
                    console.log('PAYLOAD', action, state, res);
                    const json = await res.json();
                    const { entities } = normalize(json, personsSchema)
                    return entities;
                },
                meta: { actionType: 'GET_ALL' }
           },
           'PERSON_LIST_REQUEST_FAILED'
        ],
    })
}