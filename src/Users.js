import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, destroyUser, managers }) => {
/*     users.map(user => user.ManagerId 
        ? fetchManager(user.ManagerId)
        : null    
    ) */
    return (
        <ul>
        {
            users.map(user => <li key={ user.id }>

                <Link to={`/users/${user.id}`}>
                    { user.name }            
                </Link>
                {
                    user.ManagerId 
                    ? ' managed by ' + user.ManagerId
                    : null
                }
                <button onClick={ () => destroyUser(user) }>
                    Delete
                </button>

            </li>)
        }
        </ul>
    )
}