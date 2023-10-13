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
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        getGroupList().then(data => setGroups(data));
        getCurrentUserInfo().then(res => setCurrentUser(res.user));
    }, [hasDataChanged]);

    async function getCurrentUserInfo() {
        let res = await fetch("/user", {
            method: "GET"
        });
        return await res.json();
    }

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

    async function addGroup(form) {
        if (!form.groupName || !form.groupDescription || !form.groupUsers) {
            alert("One or more fields are empty");
        } else {
            const groupUsers = form.groupUsers.split(",").map(user => user.trim());
            if (groupUsers.indexOf(currentUser) === -1) {
                groupUsers.push(currentUser);
            }
            for (const user of groupUsers) {
                let res = await fetch("/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: user }),
                });
                if (res.status === 404) {
                    alert("One or more users could not be found");
                    return;
                }
            }
            let groupJSON = JSON.stringify({
                groupName: form.groupName,
                groupDescription: form.groupDescription,
                groupUsers: groupUsers,
                meetingTimes: "TBD",
            });
            let res = await (await fetch("/groups", {
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
                console.log("Document deleted successfully");
                setDataChanged(!hasDataChanged);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSelectGroup = (groupId) => {
        const groupObj = groups.find((group) => group._id === groupId);

        const groupPageComp = (
            <GroupPage
                user={currentUser}
                group={groupObj}
                selectGroup={handleSelectGroup}
                deleteGroup={deleteGroup}
                currentGroupID={groupId}
            />
        );

        setGroupPage(groupPageComp);
    }

    return (
        <div className="dashboard">
            <Header />

            <main className="dashboard--container">

                {selectedGroupPage ? (
                    <div className="">
                        {selectedGroupPage}
                        <button
                            className="back-btn interactable"
                            type="submit"
                            onClick={() => setGroupPage(null)}
                        >
                            Back
                        </button>
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
                                addGroup={addGroup}
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
