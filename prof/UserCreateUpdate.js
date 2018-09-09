import React, { Component } from 'react';

export default class extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.save = this.save.bind(this);
        if(this.props.id) this.fetchUser(this.props.id);
    }
    componentDidUpdate(prevProps) {
        if(this.props.id && prevProps.id !== this.props.id) {
            this.fetchUser(this.props.id)
        }
        if(prevProps.id && !this.props.id) {
            this.setState({ name: '' })
        }
    }
    fetchUser(id) {
        this.props.fetchUser(id)
            .then(user => this.setState({ name: user.name }))
    }
    save(ev) {
        const { history, id } = this.props;
        ev.preventDefault();
        this.props.save({ 
            name: this.state.name,
            id 
        }, this.props.history)
            .catch(ex => this.setState({ error: 'ERROR' }))
    }
    handleChange(ev) {
        this.setState({ name: ev.target.value });
    }
    render() {
        const { name, error } = this.state;
        const { handleChange, save } = this;
        const { id } = this.props;
        return (
            <div>
                <form onSubmit={ save }>
                    <input value={ name } onChange={ handleChange }></input>
                    <button disabled={ !name }>
                    { id ? 'Update' : 'Create' }
                    </button>
                </form>
                <br />
                <h2>{ error }</h2>
            </div>
        )
    }
}