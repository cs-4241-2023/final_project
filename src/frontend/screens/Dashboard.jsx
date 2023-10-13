import React, { useEffect, useState } from "react";
import GroupPage from "./GroupPage.jsx";
import GroupList from "../components/GroupList.jsx";
import AddGroupForm from "../components/AddGroupForm.jsx";
import Header from "../components/Header.jsx";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [selectedGroupPage, setGroupPage] = useState(null);
    const [isGroupFormVisible, setGroupFormVisiblity] = useState(false);
    const [hasDataChanged, setDataChanged] = useState(false);
    const currUser = localStorage.getItem("username");

    useEffect(() => {
        getGroupList().then(data => setGroups(data));
        console.log('groups', groups)
    }, [hasDataChanged]);

    useEffect(() => {
        const selectedGroupPage = localStorage.getItem('selectedGroupPage');
        if (selectedGroupPage && groups.length > 0) {
            handleSelectGroup(selectedGroupPage);
        }
    }, [groups])


    async function getGroupList() {
        try {
            let response = await fetch("/groups", {
                method: "GET",
            });

            if (!response.ok) console.log("404: Collection Not Found");

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async function showNewGroupPage(e) {
        e.preventDefault();
        setGroupFormVisiblity(true);
    }

    async function createGroup(groupForm) {
        if (!groupForm.name || !groupForm.description || !groupForm.users) {
            alert("One or more fields are empty");
        } else {
            const groupUsers = groupForm.users.split(",").map(user => user.trim());
            if (groupUsers.indexOf(currUser) === -1) {
                groupUsers.push(currUser);
            }
            for (const username of groupUsers) {
                let res = await fetch(`/users/${username}`);
                if (res.status === 404) {
                    alert("One or more users could not be found");
                    return;
                }
            }

            const groupJSON = JSON.stringify({
                name: groupForm.name,
                description: groupForm.description,
                users: groupUsers,
                meetingTimes: "TBD",
            });

            const res = await (await fetch("/groups", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: groupJSON
            })).json();

            for (const user of groupUsers) {
                await fetch("/addUserGroup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user: user, groupID: res._id })
                });
            }

            setDataChanged(!hasDataChanged)
            setGroupFormVisiblity(false)
        }
    }

    async function deleteGroup(groupId) {
        try {
            const response = await fetch(`/groups/${groupId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error(`Error deleting document: ${errorData.message}`);
            } else {
                setDataChanged(!hasDataChanged);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelectGroup = (groupId) => {
        const groupObj = groups.find(group => group._id === groupId);
        const groupPageComp = (
            <GroupPage
                user={currUser}
                group={groupObj}
                selectGroup={handleSelectGroup}
                deleteGroup={deleteGroup}
                currentGroupID={groupId}
            />
        );

        setGroupPage(groupPageComp);
        localStorage.setItem('selectedGroupPage', groupId);
    }

    return (
        <div className="dashboard">
            <Header />

            <main className="dashboard--container">

                {selectedGroupPage ? (
                    <div className="">
                        <button
                            className="back-btn interactable"
                            type="submit"
                            onClick={() => {
                                setGroupPage(null)
                                localStorage.removeItem('selectedGroupPage');
                            }}
                        >
                            Back
                        </button>
                        {selectedGroupPage}
                    </div>
                ) : (
                    <div className="dashboard--main">
                        <div className="dashboard--main-header">
                            <h2>Your Groups</h2>
                            <div>
                                <button
                                    className="dashboard--new-group interactable"
                                    type={"submit"}
                                    onClick={(e) => showNewGroupPage(e)}
                                >
                                    Create New Group
                                </button>
                            </div>
                        </div>
                        <hr />
                        {isGroupFormVisible && (
                            <AddGroupForm
                                addGroup={createGroup}
                                onCancel={() => setGroupFormVisiblity(false)}
                            />
                        )}
                        {groups && (
                            <GroupList
                                groups={groups}
                                selectGroup={handleSelectGroup}
                                deleteGroup={deleteGroup}
                            />
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
