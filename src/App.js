import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';
import Users from './Users';
import UserCreateUpdate from './UserCreateUpdate';

export default class extends Component {
    constructor () {
        super ();
        this.state = {
            users: [],
            managers: []
        }
        this.destroyUser = this.destroyUser.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
    }
    componentDidMount () {
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => this.setState({ users }));
    }
    destroyUser (user) {
        return axios.delete(`/api/users/${user.id}`)
            .then(() => this.setState({ 
                users: this.state.users.filter(_user => _user.id !== user.id )
            }))
    }
    createUser (user, history) {
        return axios.post('/api/users', user)
            .then(res => res.data)
            .then(user => this.setState({ users: [...this.state.users, user] }))
            .then(() => history.push('/users'))
    }
    updateUser (user, history) {
        return axios.put(`/api/users/${user.id}`, user)
            .then(res => res.data)
            .then(user => this.setState({
                users: this.state.users.map(_user => _user === user ? user : _user )
            }))
            .then(() => history.push('/users'))
    }
    fetchUser (id) {
        return axios.get(`/api/users/${id}`)
            .then(res => res.data)
    }
    render () {
        const { users, managers } = this.state;
        const { destroyUser, createUser, updateUser, fetchUser } = this;

        const renderNav = ({ location }) => {
            return <Nav users={ users } path={ location.pathname }/>
        }
        const renderUsers = () => {
            return <Users users={ users } destroyUser={ destroyUser }/> 
        }
        const renderUserCreate = ({ history }) => {
            return <UserCreateUpdate save={ createUser } history={ history }/>
        }
        const renderUserUpdate = ({ history, match }) => {
            return <UserCreateUpdate save={ updateUser } history={ history } 
            id={ match.params.id } fetchUser = { fetchUser }/>
        }
        return (
            <Router>
                <div>
                    <h1>Acme Users With Managers</h1>
                    <Route render={ renderNav }/>
                    <Route path='/users' render={ renderUsers }/>
                    <Switch>
                        <Route path='/users/create' render={ renderUserCreate }/>
                        <Route path='/users/:id' render={ renderUserUpdate }/>
                    </Switch>
                </div>
            </Router>
        ) 
    }
}
