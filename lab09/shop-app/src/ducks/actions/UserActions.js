import axios from "axios";

export const USER_CREATE = 'USER_CREATE';
export const USER_LIST_REQUEST = 'USER_LIST_REQUEST';
export const USER_LIST_REQUEST_START = 'USER_LIST_REQUEST_START';
export const USER_LIST_REQUEST_SUCCESS = 'USER_LIST_REQUEST_SUCCESS';
export const USER_LIST_REQUEST_FAILED = 'USER_LIST_REQUEST_FAILED';

export const createUserAction = (newUser) => ({
    type: USER_CREATE,
    payload: newUser
});

// export const usersListRequestAction = (users) => ({
//     type: USER_LIST_REQUEST,
//     payload: users
// })

// export const usersListRequestStartAction = ({
//     type: USER_LIST_REQUEST_START
// });

// export const usersListRequestFailAction = (error) => ({
//     type: USER_LIST_REQUEST_FAILED,
//     payload: error
// })


// state => dispatch => action

