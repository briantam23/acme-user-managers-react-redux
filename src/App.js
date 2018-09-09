import React, { Component } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import store, { addUsers, deleteUser, addUser } from './store';
import Nav from './Nav';
import Users from './Users';
import UserCreate from './UserCreate';

export default class extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.destroyTodo = this.destroyTodo.bind(this);
        this.createTodo = this.createTodo.bind(this);
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        return axios.get('/api/users')
            .then(res => res.data)
            .then(users => store.dispatch(addUsers(users)))
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    destroyTodo(user) {
        return axios.delete(`/api/users/${user.id}`)
            .then(() => store.dispatch(deleteUser(user)))
    }
    createTodo(user) {
        return axios.post('/api/users')
            .then(user => store.dispatch(addUser(user)))
    }
    render() {
        const { users, managers } = this.state;
        const { destroyTodo, createTodo } = this;
        return (
            <Router>
                <div>
                    <h1>Acme Users With Managers</h1>
                    <Nav users={ users } managers={ managers }/>
                    <Route path='/users' render={ () => <Users users={ users } destroyTodo={ destroyTodo }/> }/>
                    <Route path='/users/create' render={ () => <UserCreate users={ users } createTodo={ createTodo }/>}/>
                </div>
            </Router>
        )
    }
}