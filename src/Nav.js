import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, manager }) => {
    return (
        <ul>
            <li>
                <Link to='/users'>Users ({ users.length })</Link>
            </li>
            <li>
                <Link to='/managers'>Managers (X)</Link>
            </li>
            <li>
                <Link to='/users/create'>Users Create</Link>
            </li>
        </ul>
    )
}