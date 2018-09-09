import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default ({ users, destroyUser }) => {
    return (
        <ul>
        {
            users.map(user => <li key={ user.id }><Link to={`/users/${user.id}`}>
                { user.name }</Link>
                <button onClick={ () => destroyUser(user) }>X</button>
            </li>)
        }
        </ul>
    )
}