const normalizr = require('normalizr');

//docelowo:
// {
//     entities: {
//         authors: { ... },
//         books: { ... }
//     },
//     result: [ ... ]
//  }

const apiData = [
    {
        id: 'xyz',
        title: 'Książka 1',
        pages: 456,
        authors: [
            {
                id: 'az1',
                firstName: 'Albert',
                lastName: 'Kowalski'
            },
            {
                id: 'az2',
                firstName: 'Adam',
                lastName: 'Nowak'
            }
        ]
    },
    {
        id: 'xyy',
        title: 'Książka 2',
        pages: 355,
        authors: [
            {
                id: 'az1',
                firstName: 'Albert',
                lastName: 'Kowalski'
            }
        ]
    },
    {
        id: 'xzy',
        title: 'Książka 3',
        pages: 643,
        authors: [
            {
                id: 'az3',
                firstName: 'Albert',
                lastName: 'Kowalski'
            },
            {
                id: 'az4',
                firstName: 'Monika',
                lastName: 'Kowal'
            },
            {
                id: 'az5',
                firstName: 'Grzegorz',
                lastName: 'Szpak'
            }
        ]
    },
    
]

const authorSchema = new normalizr.schema.Entity('authors', {});
const bookSchema = new normalizr.schema.Entity('books', {});

bookSchema.define({
    authors: [authorSchema]
})
const bookListSchema = [bookSchema];

const result = normalizr.normalize(apiData, bookListSchema);
// console.log(result);
// console.log(result.entities.books);




// -------- zad 2

const allEntities = [
    "authors",
    "books"
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



const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
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

const testAuthors = entityReducer(
    'authors', 
{ allIds: [], byId: {} }, 
{
    type: 'GET_ALL',
    payload: result
})

const testBooks = entityReducer(
    'books', 
{ allIds: [], byId: {} }, 
{
    type: 'GET_ALL',
    payload: result
})


// console.log('Reducer result authors', testAuthors);
console.log('Reducer result books', testBooks);

// console.log('authors', result.entities['authors'])
// console.log('books', result.entities['books'])

const reducedBooks = testBooks;

const testBookAdd = entityReducer(
    'books', 
    reducedBooks, 
{
    type: 'ADD',
    payload: {
        id: 'aaa',
        title: 'Książka 4',
        pages: 643,
        authors: [
            {
                id: 'az3',
                firstName: 'Albert',
                lastName: 'Kowalski'
            }
        ]
    },
})

console.log("TestBookAdd: ", testBookAdd);

