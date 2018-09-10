import React, { Component } from 'react';
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import store, { addUsers, deleteUser, addUser, editUser, manager } from './store';
import Nav from './Nav';
import Users from './Users';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import Managers from './Managers';

export default class extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.destroyUser = this.destroyUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
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
    fetchUser(id) {
        return axios.get(`/api/users/${id}`)
            .then(res => res.data)
    }
    render() {
        const { users } = this.state;
        const { destroyUser, createUser, updateUser, fetchUser } = this;
        const duplicateManagers = () => {
            let managersArr = [];
            for(let i=0; i < users.length; i++) {
                for(let j=0; j < users.length; j++) {
                    if(users[i].ManagerId === users[j].id) {
                        managersArr[users[i].ManagerId] = users[j].name;
                    }
                }
            }
            return managersArr;
        }
        const managers = duplicateManagers().filter(user => user.ManagerId !== null)
        return (
            <Router>
                <div>
                    <h1>Acme Users With Managers</h1>
                    <hr />
                    <Route render={ () => <Nav users={ users } managers={ managers }/> } />
                    <Route path='/users' render={ () => <Users users={ users } fetchUser={ fetchUser } destroyUser={ destroyUser } duplicateManagers={ duplicateManagers }/> }/>
                    <Route path='/managers' render={ () => <Managers managers={ managers }/>}/>
                    <Switch>
                        <Route path='/users/create' render={ ({ history }) => <UserCreate fetchUser={ fetchUser } createUser={ createUser } history={ history }/>}/>
                        <Route path='/users/:id' render={ ({ history, match }) => <UserEdit fetchUser={ fetchUser } updateUser={ updateUser } history={ history } id={ match.params.id } managers={ managers } duplicateManagers={ duplicateManagers }/>} />
                    </Switch>
                </div>
            </Router>
        )
    }
}