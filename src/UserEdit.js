import React, { Component } from 'react';
import store, { changeName, getManager } from './store';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.onUpdate = this.onUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.fetchUser = this.fetchUser.bind(this);
        this.fetchUser(this.props.id);
    }
    componentDidMount() { this.unsubscribe = store.subscribe(() => this.setState(store.getState())); }
    componentWillUnmount() { this.unsubscribe(); }
    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id) this.fetchUser(this.props.id);
    }
    onUpdate(ev) {
        ev.preventDefault();
        this.props.updateUser({ 
            id: this.props.id, 
            name: this.state.name,
            ManagerId: this.state.manager.id
        })
            .then(() => this.props.history.push('/users'));
    }
    handleChange(ev) {
        store.dispatch(changeName(ev.target.value));
    }
    handleManagerChange(ev) {
        if(ev.target.value === '') return;
        this.props.fetchUser(ev.target.value)
            .then(manager => store.dispatch(getManager(manager)));
    }
    fetchUser(id) {
        this.props.fetchUser(id)
            .then(user => store.dispatch(changeName(user.name)));
    }
    render() {
        const { name, users } = this.state;
        const { onUpdate, handleChange, handleManagerChange } = this;
        const { managers, id } = this.props;
        return (
            <form onSubmit={ onUpdate }>
                <input value={ name } onChange={ handleChange }></input>
                <select onChange={ handleManagerChange }>
                    <option value=''>--none--</option>
                {
                    users.map(user => <option key={ user.id } value={ user.id }
                    /* selected={ managers.Id === user.ManagerId ? 'selected' : null } */>
                        { user.name }
                    </option>)
                }
                </select>
                <button disabled={ !name }>Update</button>
            </form>
        )
    }
}
