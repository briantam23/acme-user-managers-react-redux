import React from 'react';

export default ({ users, destroyTodo }) => {
    return (
        <ul>
        {
            users.map(user => <li key={ user.id }>
                { user.name }
                <button onClick={ () => destroyTodo(user) }>Delete</button>
            </li>)
        }
        </ul>
    )
}