import React from "react";
import Group from "./Group.jsx";

function GroupList({ groups, selectGroup, deleteGroup }) {
  return (
    <div className={"group-container"}>
      {groups.map((group, index) => (
        <Group key={index} group={group} onSelect={selectGroup} deleteGroup={deleteGroup} />
      ))}
    </div>
  );
}

export default GroupList;
