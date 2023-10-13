import React from 'react';

function GroupCard({ group }) {
    return (
        <div className="group">
            <h3>{group.name}</h3><p>{group.description}</p><ul>
                {group.users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    );
}

export default GroupCard;
