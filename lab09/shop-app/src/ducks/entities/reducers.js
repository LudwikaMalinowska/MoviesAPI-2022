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

    switch(action.type) {
        case 'GET_ALL':
            const actionEntities = action.payload.entities[entity];
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
            return {
                byId: {
                    ...state.byId,
                    [newObj.id]: newObj 
                },
                allIds: [
                    ...state.allIds,
                    newObj.id
                ]
            }
        default:
            console.log('Error action not recognized');
    }
}



