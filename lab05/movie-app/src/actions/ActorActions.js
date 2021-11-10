export const addActorAction = (payload) => ({
    type: 'ACTOR_ADD',
    payload
});

export const editActorAction = (payload) => ({
    type: 'ACTOR_EDIT',
    payload
});

export const deleteActorAction = (payload) => ({
    type: 'ACTOR_DELETE',
    payload
});

export const addMovieToActorAction = (payload) => ({
    type: 'ACTOR_ADD_MOVIE',
    payload
});

export const deleteMovieFromActorAction = (payload) => ({
    type: 'ACTOR_DELETE_MOVIE',
    payload
});