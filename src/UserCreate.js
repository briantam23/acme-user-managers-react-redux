import React, { Component } from 'react';
import store, { changeName, getManager, getManagerId } from './store';

export default class extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.onCreate = this.onCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleManagerChange = this.handleManagerChange.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.setDefault();
    }
    componentDidMount() { this.unsubscribe = store.subscribe(() => this.setState(store.getState())); }
    componentWillUnmount() { this.unsubscribe(); }
    componentWillReceiveProps(nextProps) {
        if(nextProps.id !== this.props.id) {
            this.setDefault();
            this.unsubscribe();
        }
    }
    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id) {
            this.setDefault();
            this.unsubscribe();
        }
    }
    onCreate(ev) {
        ev.preventDefault();
        this.props.createUser({ 
            name: this.state.name, 
            ManagerId: this.state.manager ? this.state.manager.id : null
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
    setDefault() {
        store.dispatch(changeName(''));
        store.dispatch(getManager(null));
        store.dispatch(getManagerId(null))
    }
    render() {
        const { name, users } = this.state;
        const { onCreate, handleChange, handleManagerChange } = this;
        return (
            <form onSubmit={ onCreate }>
                <input value={ name } onChange={ handleChange }></input>
                <select onChange={ handleManagerChange } >
                    <option value=''>--none--</option>
                {
                    users.map(user => <option key={ user.id } value={ user.id }>
                        { user.name }
                    </option>)
                }
                </select>
                <button disabled={ !name }>Create</button>
            </form>
        )
    }
}