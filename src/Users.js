import React from 'react';
import { Link } from 'react-router-dom';
import store, { addUsersManagers } from './store';

export default ({ users, destroyUser, fetchUser, duplicateManagers }) => {
    let managers = [];
    for(let i=0; i < users.length; i++) {
        for(let j=0; j < users.length; j++) {
            if(users[i].ManagerId === users[j].id) {
                managers[users[i].ManagerId] = users[j].name;
            }
        }
    }
    return (
        <ul>
        <br />
        <br />
        {
            users.map(user => <li key={ user.id }>
                <Link to={`/users/${user.id}`}>
                    { user.name } 
                </Link>
                {
                    user.ManagerId 
                    ? ' managed by ' + duplicateManagers()[user.ManagerId] 
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