import * as _ from 'lodash';
const normalizr = require('normalizr');

const allEntities = [
    "movies",
    "persons",
    "actors"
]

const defaultState = allEntities.reduce(
    (acc, currentEntity) => ({
        ...acc,
        [currentEntity]: {
            byId: {},
            allIds: []
        }
    }), {}
);




export const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
    // console.log("\nentity: ", entity, "\nstate: ", state, "\naction: ", action);
    const {actionType} = action.meta;
    const actionEntities = action.payload[entity];
    let newObj;
    let newObjId;
    let nState;

    switch(actionType) {
        case 'GET_ALL':
            return {
                byId: {
                    ...Object.keys(actionEntities).reduce(
                        (acc, id) => ({
                            ...acc,
                            [id]: {
                                ...state.byId[id],
                                ...actionEntities[id]
                            }
                        })
                    , {}),
                },
                allIds: Object.keys(actionEntities)
            }
        case 'ADD':
            newObj = action.payload;
            newObjId = Object.keys(newObj[entity])[0];
            
            return {
                byId: {
                    ...state.byId,
                    [newObjId]: newObj[entity][newObjId] 
                },
                allIds: [
                    ...state.allIds,
                    newObjId
                ]
            }
        case 'DELETE':
            const delObj = action.payload;
            const delObjId = Object.keys(delObj[entity])[0];
            nState = _.omit(state.byId, delObjId);

            return {
                byId: nState,
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id)),
            }
        case 'EDIT':
            newObj = action.payload;
            newObjId = Object.keys(newObj[entity])[0];

            nState = _.omit(state.byId, actionEntities);
            
            return {
                byId: {
                    ...nState,
                    [newObjId]: newObj[entity][newObjId] 
                }, 
                allIds: state.allIds
            }
        case 'PATCH':
            newObj = action.payload;
            newObjId = Object.keys(newObj[entity])[0];
            nState = _.omit(state.byId, actionEntities);
            
            return {
                byId: {
                    ...nState,
                    [newObjId]: newObj[entity][newObjId] 
                }, 
                allIds: state.allIds
            }
        case 'FAILURE':
            return state;
        default:
            return state;
    }
}

export const entities = (state = defaultState, action) => {
    if(!action.meta || !action.meta.actionType) return state;

    return {
        ...state,
        ...Object.keys(action.payload).reduce(
            (acc, entity) => ({
                ...acc,
                [entity]: entityReducer(entity, state[entity], action)
            }), {}
        ),
    }
}
