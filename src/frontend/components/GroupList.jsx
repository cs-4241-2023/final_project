import React from "react";
import GroupCard from "./GroupCard.jsx";

function GroupList({ groups, selectGroup, deleteGroup }) {
    return (
        <div className={"dashboard--group-list"}>
            {groups.map((group, index) => (
                <div key={index} className="group-card">
                    <GroupCard
                        group={group}
                        selectGroup={selectGroup}
                        deleteGroup={deleteGroup}
                    />
                    <div className="group-buttons">
                        <button
                            className="group-submit interactable"
                            type="submit"
                            onClick={() => selectGroup(group._id)}
                        >
                            Show Details
                        </button>
                        <button
                            className="group-delete interactable"
                            type={"submit"}
                            onClick={(e) => {
                                e.preventDefault();
                                deleteGroup(group._id);
                            }}
                        >
                            Delete Group
                        </button>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default GroupList;
