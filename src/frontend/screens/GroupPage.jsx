import React from 'react';
import GroupCard from '../components/GroupCard.jsx';

const GroupPage = ({ group, selectGroup, deleteGroup}) => {
    return (
        <div>
            <GroupCard
                group={group}
                selectGroup={selectGroup}
                deleteGroup={deleteGroup}
            />
        </div>
    );
};

export default GroupPage;
