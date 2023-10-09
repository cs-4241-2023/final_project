import React from "react";
import GroupInfo from "./GroupInfo.jsx";

function GroupList({ groups, selectGroup, deleteGroup }) {
  return (
    <div className={"group-container"}>
      {groups.map((group, index) => (
        <GroupInfo key={index} group={group} selectGroup={selectGroup} deleteGroup={deleteGroup} />
      ))}
    </div>
  );
}

export default GroupList;
