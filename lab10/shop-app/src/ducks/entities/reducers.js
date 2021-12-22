import * as _ from 'lodash';
const normalizr = require('normalizr');

const allEntities = [
    "users",
    "products"
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
    // const actionEntities = action.payload.entities[entity];
    // console.log('Entity', actionEntities);
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
            // console.log(newObjId);
            // console.log("newObj: ", newObj);
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
        case 'UPDATE':
            let newState = state;
            const id = Object.keys(action.payload.products)[0];
            let updatedObj = action.payload.products[id];
            // console.log("id", id);
            // console.log("ddddd");
            // console.log("d", updatedObj);
            newState.byId[id] = updatedObj;
            
            return newState;
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


