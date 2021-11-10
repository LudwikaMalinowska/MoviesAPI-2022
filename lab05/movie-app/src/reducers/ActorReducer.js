export const actorReducer = (state = [], action) => {
    let newActors;
    let index, movieIds, actorId, movieId;
    switch(action.type) {
        case 'ACTOR_ADD':
            return [...state, action.payload];
        case 'ACTOR_EDIT':
            
            newActors = [...state];
            const editedActor = action.payload;
            index = newActors.findIndex(actor => actor.id === editedActor.id);
            
            newActors[index].firstName = editedActor.firstName;
            newActors[index].lastName = editedActor.lastName;
            newActors[index].age = editedActor.age;
            
            return newActors;

        case 'ACTOR_ADD_MOVIE':
            newActors = [...state];
            actorId = action.payload.actorId;
            movieId = action.payload.movieId;


            index = newActors.findIndex(actor => actor.id === actorId);
            movieIds = newActors[index].movieIds;
            // console.log(movieIds);
            newActors[index].movieIds = [...movieIds, movieId];

            return newActors;
        case 'ACTOR_DELETE_MOVIE':
            newActors = [...state];
            actorId = action.payload.actorId;
            movieId = action.payload.movieId;

            index = newActors.findIndex(actor => actor.id === actorId);
            // console.log("index: ", index, "actor_id:", actorId);
            movieIds = [...newActors[index].movieIds];
            // console.log("movieIds:", newActors[index].movieIds);
            newActors[index].movieIds = movieIds.filter(id => id !== movieId);

            return newActors;
        case 'ACTOR_DELETE':
            newActors = state.filter(actor => actor.id !== action.payload.id)
            return newActors;
        default: 
            return state;
    }
};