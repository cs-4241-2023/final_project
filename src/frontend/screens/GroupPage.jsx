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

    const [groupAvailabilities, setGroupAvailabilities] = useState({});

    return (
        <div>
            <GroupCard
                group={group}
                selectGroup={selectGroup}
                deleteGroup={deleteGroup}
            />
            <div className="timegrid-container">
                <SoloGrid
                    times={times}
                    days={days}
                    groupAvailabilities={groupAvailabilities}
                    setGroupAvailabilities={setGroupAvailabilities}
                />
                <GroupGrid
                    days={days}
                    times={times}
                    groupAvailabilities={groupAvailabilities}
                    setGroupAvailabilities={setGroupAvailabilities}
                />
            </div>
        </div>
    );
};

export default GroupPage;
