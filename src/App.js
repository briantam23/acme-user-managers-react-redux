import React, { Component } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import store, { addUsers, deleteUser, addUser, editUser } from './store';
import Nav from './Nav';
import Users from './Users';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';

export default class extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.destroyUser = this.destroyUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        return axios.get('/api/users')
            .then(res => res.data)
            .then(users => store.dispatch(addUsers(users)));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    destroyUser(user) {
        return axios.delete(`/api/users/${user.id}`)
            .then(() => store.dispatch(deleteUser(user)));
    }
    createUser(user) {
        return axios.post('/api/users', user)
            .then(res => res.data)
            .then(user => store.dispatch(addUser(user)));
    }
    updateUser(user) {
        return axios.put(`/api/users/${user.id}`, user)
            .then(res => res.data)
            .then(user => store.dispatch(editUser(user)));
    }
/*     fetchUser(id) {
        return axios.get()
    } */
    render() {
        const { users, managers } = this.state;
        const { destroyUser, createUser, updateUser } = this;
        return (
            <Router>
                <div>
                    <h1>Acme Users With Managers</h1>
                    <Nav users={ users } managers={ managers }/>
                    <Route path='/users' render={ () => <Users users={ users } destroyUser={ destroyUser }/> }/>
                    <Switch>
                        <Route path='/users/create' render={ ({ history }) => <UserCreate users={ users } createUser={ createUser } history={ history }/>}/>
                        <Route path='/users/:id' render={ ({ history, match }) => <UserEdit updateUser={ updateUser } history={ history } id={ match.params.id }/>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}