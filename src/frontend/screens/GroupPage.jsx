import React, {useState} from 'react';
import GroupCard from '../components/GroupCard.jsx';
import SoloGrid from "../components/SoloGrid.jsx";

const GroupPage = ({ group, selectGroup, deleteGroup}) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const [availability, setAvailability] = useState({});
    return (
        <div>
            <GroupCard
                group={group}
                selectGroup={selectGroup}
                deleteGroup={deleteGroup}
            />
            <SoloGrid days={days} availability={availability} setAvailability={setAvailability} />
        </div>
    );
};

export default GroupPage;
