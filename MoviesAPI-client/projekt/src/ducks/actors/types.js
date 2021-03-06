
const ACTOR_LIST_REQUEST_START = 'ACTOR_LIST_REQUEST_START';     
const ACTOR_LIST_REQUEST_FAILED = 'ACTOR_LIST_REQUEST_FAILED';        
const ACTOR_LIST_REQUEST_SUCCESS = 'ACTOR_LIST_REQUEST_SUCCESS';

 const MOVIE_ACTORS_REQUEST_START = 'MOVIE_ACTORS_REQUEST_START';      
const MOVIE_ACTORS_REQUEST_FAILED = 'MOVIE_ACTORS_REQUEST_FAILED';     
const MOVIE_ACTORS_REQUEST_SUCCESS = 'MOVIE_ACTORS_REQUEST_SUCCESS';
            

const MOVIE_ACTOR_ADD_START = 'MOVIE_ACTOR_ADD_START';       
const MOVIE_ACTOR_ADD_FAILURE = 'MOVIE_ACTOR_ADD_FAILURE';        
const MOVIE_ACTOR_ADD_SUCCESS = 'MOVIE_ACTOR_ADD_SUCCESS';
            

const MOVIE_ACTOR_DELETE_START = 'MOVIE_ACTOR_DELETE_START';     
const MOVIE_ACTOR_DELETE_FAILURE = 'MOVIE_ACTOR_DELETE_FAILURE';
const MOVIE_ACTOR_DELETE_SUCCESS = 'MOVIE_ACTOR_DELETE_SUCCESS';
        
const types = {
    ACTOR_LIST_REQUEST_START, 
    ACTOR_LIST_REQUEST_FAILED,
    ACTOR_LIST_REQUEST_SUCCESS,

    MOVIE_ACTORS_REQUEST_START,
    MOVIE_ACTORS_REQUEST_FAILED,
    MOVIE_ACTORS_REQUEST_SUCCESS,

    MOVIE_ACTOR_ADD_START,
    MOVIE_ACTOR_ADD_FAILURE,
    MOVIE_ACTOR_ADD_SUCCESS,

    MOVIE_ACTOR_DELETE_START,
    MOVIE_ACTOR_DELETE_FAILURE,
    MOVIE_ACTOR_DELETE_SUCCESS,      
}

export default types;