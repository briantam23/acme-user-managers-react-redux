import React from 'react';
import { Link } from 'react-router-dom';

export default ({ users, path }) => {
    const isSelected = _path => _path === path; 
    return (
        <ul>
            <li className={ isSelected('/users') ? 'selected' : null }>
                <Link to='/users'>Users ({ users.length })</Link>
            </li>
            <li className={ isSelected('/managers') ? 'selected' : null }>
                <Link to='/managers'>Managers (x)</Link>
            </li>
            <li className={ isSelected('/users/create') ? 'selected' : null }>
                <Link to='/users/create'>Users Create</Link>
            </li>
        </ul>
    )
}