export const actorReducer = (state = [], action) => {
    let newDirectors;
    let index;
    switch(action.type) {
        case 'ACTOR_ADD':
            return [...state, action.payload];
        case 'ACTOR_EDIT':
            
            // newDirectors = [...state];
            // const editedDirector = action.payload;
            
            // index = newDirectors.findIndex(director => director.id === editedDirector.id);
            
            // newDirectors[index].firstName = editedDirector.firstName;
            // newDirectors[index].lastName = editedDirector.lastName;
            // newDirectors[index].age = editedDirector.age;
            
            // return newDirectors;

            return state;
        case 'ACTOR_DELETE':
            newDirectors = state.filter(director => director.id !== action.payload.id)
            return newDirectors;
        default: 
            return state;
    }
};