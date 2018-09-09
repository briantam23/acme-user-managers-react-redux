import React, { Component } from 'react';
import store, { changeName } from './store';

export default class extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.onCreate = this.onCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() { this.unsubscribe = store.subscribe(() => this.setState(store.getState())); }
    componentWillUnmount() { this.unsubscribe(); }
    onCreate(ev) {
        ev.preventDefault();
        
    }
    handleChange(ev) {
        store.dispatch(changeName(ev.target.value));
    }
    render() {
        const { name } = this.state;
        const { onCreate, handleChange } = this;
        return (
            <form onSubmit={ onCreate }>
                <input value={ name } onChange={ handleChange }></input>
                <button disabled={ !name }>Create</button>
            </form>
        )
    }
}