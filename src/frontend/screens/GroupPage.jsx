import React from 'react';
import GroupCard from '../components/GroupCard.jsx';

const GroupPage = ({ group, selectGroup, deleteGroup}) => {
    return (
        <div>
            <h1>meine groupe ( ͡° ͜ʖ ͡°)</h1>
            <GroupCard
                group={group}
                selectGroup={selectGroup}
                deleteGroup={deleteGroup}
            />
        </div>
    );
};

export default GroupPage;
