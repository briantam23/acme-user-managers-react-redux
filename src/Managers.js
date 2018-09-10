import React from 'react';

export default ({ managers }) => {
    return (
        <ul>
        {
            managers.map((manager, idx) => <li key={ idx }>
                { manager }
            </li>)
        }
        </ul>
    )
}