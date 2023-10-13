import React, { useState } from 'react';
import GroupCard from '../components/GroupCard.jsx';
import SoloGrid from "../components/SoloGrid.jsx";
import GroupGrid from "../components/GroupGrid.jsx";

const GroupPage = ({ group, selectGroup, deleteGroup, currentGroupID, user }) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = [
        '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    return (
        <div>
            <GroupCard
                group={group}
                selectGroup={selectGroup}
                deleteGroup={deleteGroup}
            />
            <div className="timegrid-container">
                <SoloGrid user={user} times={times} days={days} currentGroupID={currentGroupID} />
                <GroupGrid days={days} times={times} />
            </div>
        </div>
    );
};

export default GroupPage;
