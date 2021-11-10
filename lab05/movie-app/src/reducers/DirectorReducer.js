export const directorReducer = (state = [], action) => {
    let newDirectors;
    let index;
    switch(action.type) {
        case 'DIRECTOR_ADD':
            return [...state, action.payload];
        case 'DIRECTOR_EDIT':
            // console.log(action.payload);
            newDirectors = [...state];
            const editedDirector = action.payload;
            // console.log("ed: ", editedDirector);
            index = newDirectors.findIndex(director => director.id === editedDirector.id);
            // console.log("id: ", index);

            newDirectors[index].firstName = editedDirector.firstName;
            newDirectors[index].lastName = editedDirector.lastName;
            newDirectors[index].age = editedDirector.age;
            // console.log(newDirectors);
            return newDirectors;
        case 'DIRECTOR_DELETE':
            newDirectors = state.filter(director => director.id !== action.payload.id)
            return newDirectors;
        default: 
            return state;
    }
};