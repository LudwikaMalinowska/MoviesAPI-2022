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

console.log(defaultState);



export const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
    console.log("\nentity: ", entity, "\nstate: ", state, "\naction: ", action);
    const {actionType} = action.meta;
    const actionEntities = action.payload[entity];

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
            const newObj = action.payload;
            const newObjId = Object.keys(newObj.products)[0];
            
            return {
                byId: {
                    ...state.byId,
                    [newObjId]: newObj.products[newObjId] 
                },
                allIds: [
                    ...state.allIds,
                    newObjId
                ]
            }
        case 'DELETE':
            return {
                byId: _.omit(state.byId, actionEntities),
                allIds: state.allIds.filter(id => !Object.keys(actionEntities).includes(id)),
            }
        default:
            // console.log('Error action not recognized');
            return state;
    }
}

export const entities = (state = defaultState, action) => {
    if(!action.meta || !action.meta.actionType) return state;

    console.log(action);
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
