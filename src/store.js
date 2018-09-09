import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
    users: [],
    managers: [],
    name: ''
}

//Action Types
const ADD_USERS = 'ADD_USERS';
const DELETE_USER = 'DELETE_USER';
const CHANGE_NAME = 'CHANGE_NAME';
const ADD_USER = 'ADD_USER';
const EDIT_USER = 'EDIT_USER';
const ADD_MANAGERS = 'ADD_MANAGER';

//Action Creators
export const addUsers = users => ({ type: ADD_USERS, users });
export const deleteUser = user => ({ type: DELETE_USER, users: user });
export const changeName = name => ({ type: CHANGE_NAME, name });
export const addUser = user => ({ type: ADD_USER, users: user });
export const editUser = user => ({ type: EDIT_USER, users: user });

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERS:
            return Object.assign({}, state, { users: action.users });
        case DELETE_USER:
            return Object.assign({}, state, { users: state.users.filter(_user => _user.id !== action.users.id) });
        case CHANGE_NAME:
            return Object.assign({}, state, { name: action.name });
        case ADD_USER:
            return Object.assign({}, state, { users: [...state.users, action.users]});
        case EDIT_USER:
            return Object.assign({}, state, { users: state.users.map(_user => _user.id !== action.users.id ? _user : action.users ) }); 
        default:
            return state;
    }
}

export default createStore(reducer, applyMiddleware(loggerMiddleware));

