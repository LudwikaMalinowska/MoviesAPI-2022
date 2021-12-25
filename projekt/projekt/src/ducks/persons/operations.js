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

export const createPerson = (newPerson) => {
    
    return createAction({
        endpoint: 'http://localhost:5000/api/persons',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson),
        types: [
            'PERSON_CREATE_START',
            {
                type: 'PERSON_CREATE_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(newPerson, personSchema);
                    return entities;
                },
                meta: { actionType: 'ADD' }
           },
            'PERSON_CREATE_FAILURE'
        ]
    })
}

export const editPerson = (editedPerson) => {

    return createAction({
        endpoint: `http://localhost:5000/api/persons/${editedPerson.id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedPerson),
        types: [
            'PERSON_EDIT_START',
            {
                type: 'PERSON_EDIT_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(editedPerson, personSchema);
                    return entities;
                },
                meta: { actionType: 'EDIT' }
           },
            'PERSON_EDIT_FAILURE'
        ]
    })
}

export const deletePerson = (personToDelete) => {

    return createAction({
        endpoint: `http://localhost:5000/api/persons/${personToDelete.id}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(personToDelete),
        types: [
            'PERSON_DELETE_START',
            {
                type: 'PERSON_DELETE_SUCCESS',
                payload: async (action, state, res) => {
                    const { entities } = normalize(personToDelete, personSchema);
                    return entities;
                },
                meta: { actionType: 'DELETE' }
           },
            'PERSON_DELETE_FAILURE'
        ]
    })
}