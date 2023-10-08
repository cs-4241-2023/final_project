import React from 'react';

function Group(props) {
    return (
        <div className="group">
            <h3>{props.groupName}</h3>
            <p>{props.groupDescription}</p>
            <ul>
                {props.groupUsers.split(',').map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
            <p>Possible Group Meeting Times: {props.meetingTimes}</p>
            <button
                className="group-btn"
                type="submit"
                onClick={() => {
                    // Handle navigation to group page here
                }}
            >
                Go To Group Page
            </button>
            <button className={"delete-btn"} type={"submit"} onClick={(e) => props.deleteGroup(e, props.group._id)}>Delete Group</button>
        </div>
    );
}

export default Group;
