import React, { Component } from 'react';
import store, { changeName } from './store';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.onUpdate = this.onUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() { this.unsubscribe = store.subscribe(() => this.setState(store.getState())); }
    componentWillUnmount() { this.unsubscribe(); }
    onUpdate(ev) {
        ev.preventDefault();
        this.props.updateUser({ id: this.props.id, name: this.state.name})
            .then(() => this.props.history.push('/users'));
    }
    handleChange(ev) {
        store.dispatch(changeName(ev.target.value));
    }
    render() {
        const { name } = this.state;
        const { onUpdate, handleChange } = this;
        return (
            <form onSubmit={ onUpdate }>
                <input value={ name} onChange={ handleChange }></input>
                <button disabled={ !name }>Update</button>
            </form>
        )
    }
}
