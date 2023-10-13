import React, {useState} from 'react';
import GroupCard from '../components/GroupCard.jsx';
import SoloGrid from "../components/SoloGrid.jsx";

const GroupPage = ({ group, selectGroup, deleteGroup, currentGroupID, user}) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const [availability, setAvailability] = useState({});
    return (
        <div>
            <GroupCard
                group={group}
                selectGroup={selectGroup}
                deleteGroup={deleteGroup}
            />
            <SoloGrid user={user} days={days} availability={availability} setAvailability={setAvailability} currentGroupID={currentGroupID}/>
        </div>
    );
};

export default GroupPage;
