import React, { useEffect, useState } from "react";
import "../css/Dashboard.css"
import GroupList from "../components/GroupList.jsx";
import AddGroupForm from "../components/AddGroupForm.jsx";
import Header from "../components/Header.jsx";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isGroupFormVisible, setGroupFormVisiblity] = useState(false);
    const [hasDataChanged, setDataChanged] = useState(false);

    useEffect(() => {
        getGroupList("Groups").then((data) => {
            setGroups(data);
        });
    }, [hasDataChanged]);

    async function getGroupList() {
        try {
            let response = await fetch("/groups", {
                method: "GET"
            });

            if (!response.ok) console.log("404: Collection Not Found");

            const data = await response.json();
            return data
        } catch (error) {
            console.error(error);
        }
    }

    async function showNewGroupPage(e) {
        e.preventDefault();
        setGroupFormVisiblity(
            <div className={"add-group-page"}>
                <h2>Add a Group</h2>
                <form onSubmit={(e) => addGroup(e)}>
                    <input id={"groupName"} type={"text"} placeholder={"group name"} />
                    <input id={"groupDescription"} type={"text"} placeholder={"group description"} />
                    <input id={"groupUsers"} type={"text"} placeholder={"group users (separate each user with a comma)"} />
                    <button onClick={() => { setGroupFormVisiblity(<></>) }}>Cancel</button>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>
        );
    }

    async function addGroup(form) {
        if (!form.groupName || !form.groupDescription || !form.groupUsers) {
            alert("One or more fields are empty");
        } else {
            const groupUsers = form.groupUsers.split(",").map(user => user.trim())
            let groupJSON = JSON.stringify({
                collection: "Groups",
                groupName: form.groupName,
                groupDescription: form.groupDescription,
                groupUsers: groupUsers,
                meetingTimes: "TBD"
            });
            await fetch("/groups", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: groupJSON
            });
            setDataChanged(!hasDataChanged)
            setGroupFormVisiblity(false)
        }
    }

    async function deleteGroup(groupId) {
        try {
            const response = await fetch(`/groups/${groupId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error deleting document: ${errorData.message}`);
            } else {
                console.log('Document deleted successfully');
                setDataChanged(!hasDataChanged);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (<>
        <Header />
        <main>
            {selectedGroup ? (
                <div className={"group-container"}>
                    {selectedGroup}
                    <button className={"back-btn"} type={"submit"} onClick={() => setSelectedGroup(null)}>
                        Back
                    </button>
                </div>
            ) : (
                <div>
                    <button
                        className={"add-group-btn"}
                        type={"submit"}
                        onClick={(e) => showNewGroupPage(e)}
                    >
                        Create New Group
                    </button>
                    <h2>Tracked Groups</h2>

                    {isGroupFormVisible &&
                        <AddGroupForm addGroup={addGroup} onCancel={() => setGroupFormVisiblity(false)} />
                    }
                    <GroupList groups={groups} selectGroup={setSelectedGroup} deleteGroup={deleteGroup} />
                </div>
            )}
        </main>
    </>)
}

export default Dashboard;