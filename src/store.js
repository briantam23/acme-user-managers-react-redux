import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
    users: [],
    name: '',
    manager: {},
    managerId: 0
}

//Action Types
const ADD_USERS = 'ADD_USERS';
const DELETE_USER = 'DELETE_USER';
const CHANGE_NAME = 'CHANGE_NAME';
const GET_MANAGER_ID = 'GET_MANAGER_ID';
const ADD_USER = 'ADD_USER';
const EDIT_USER = 'EDIT_USER';
const GET_MANAGER = 'GET_MANAGER';

//Action Creators
export const addUsers = users => ({ type: ADD_USERS, users });
export const deleteUser = user => ({ type: DELETE_USER, users: user });
export const changeName = name => ({ type: CHANGE_NAME, name });
export const getManagerId = managerId => ({ type: GET_MANAGER_ID, managerId })
export const addUser = user => ({ type: ADD_USER, users: user });
export const editUser = user => ({ type: EDIT_USER, users: user });
export const getManager = manager => ({ type: GET_MANAGER, manager })

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            return {};
        }
        case ADD_USERS:
            return Object.assign({}, state, { 
                users: action.users 
            });
        case DELETE_USER:
            return Object.assign({}, state, { 
                users: state.users.filter(_user => _user.id !== action.users.id) 
            });
        case CHANGE_NAME:
            return Object.assign({}, state, { 
                name: action.name 
            });
        case GET_MANAGER_ID:
            return Object.assign({}, state, { 
                managerId: action.managerId 
            })
        case ADD_USER:
            return Object.assign({}, state, { 
                users: [...state.users, action.users], 
                managerId: null, 
                name: '' 
            });
        case EDIT_USER:
            return Object.assign({}, state, { 
                users: state.users.map(_user => _user.id !== action.users.id ? _user : action.users ),
                managerId: null,
                name: ''
            });
        case GET_MANAGER:
            return Object.assign({}, state, { 
                manager: action.manager 
            });
        default:
            return state;
    }
}

export default createStore(reducer, applyMiddleware(loggerMiddleware));

