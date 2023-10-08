import React, { useEffect, useState } from "react";
import "../css/Dashboard.css"
import Group from "../components/Group.jsx";
import Header from "../components/Header.jsx";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [addGroupPage, setAddGroupPage] = useState(<></>);
    const [hasDataChanged, setDataChanged] = useState(false);
    const [collectionName, setCollectionName] = useState("TestUserCollection"); // TODO: Brandon, however you implement authentication set this variable to the correct collection name

    useEffect(() => {
        getCurrentCollection(collectionName).then((data) => {

            let groupArr = []

            data.forEach((group) => {
                let listItems = []
                group.groupUsers.split(",").forEach((user) => {
                    listItems.push(<li key={listItems.length}>{user.trim()}</li>);
                });

                const groupComponent =
                    <div>
                        <Group key={groupArr.length}
                            groupName={group.groupName}
                            groupDescription={group.groupDescription}
                            groupUsers={group.groupUsers}
                            meetingTimes={group.meetingTimes}
                        />
                        
                    </div>

                groupArr.push(groupComponent);
                setSelectedGroup(groupComponent);
                setGroups(groupArr);
                setDataChanged(false);
            });
        }
        );
    }, [hasDataChanged]);

    async function getCurrentCollection() {
        let result = await fetch("/get-collection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestedCollection: collectionName }),
        });
        if (result.status !== 404) {
            return await result.json();
        } else {
            console.log("404: Collection Not Found!");
            return [];
        }
    }

    async function showNewGroupPage(e) {
        e.preventDefault();
        setAddGroupPage(
            <div className={"add-group-page"}>
                <h2>Add a Group</h2>
                <form onSubmit={(e) => addGroup(e)}>
                    <input id={"groupName"} type={"text"} placeholder={"group name"} />
                    <input id={"groupDescription"} type={"text"} placeholder={"group description"} />
                    <input id={"groupUsers"} type={"text"} placeholder={"group users (separate each user with a comma)"} />
                    <button onClick={() => { setAddGroupPage(<></>) }}>Cancel</button>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>
        );
    }

    async function addGroup(e) {
        e.preventDefault()

        let form = e.target.elements;

        if (!form.groupName.value || !form.groupDescription.value || !form.groupUsers.value) {
            alert("One or more fields are empty");
        } else {
            let groupJSON = JSON.stringify({
                collection: collectionName,
                groupName: form.groupName.value,
                groupDescription: form.groupDescription.value,
                groupUsers: form.groupUsers.value,
                meetingTimes: "TBD"
            });
            await fetch("/add-group", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: groupJSON
            });
            setDataChanged(true);
            setAddGroupPage(<></>)
        }
    }

    async function deleteGroup(e, assignmentID) {
        e.preventDefault();

        await fetch("/delete-group", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collection: collectionName, _id: assignmentID })
        });
        setDataChanged(true);
    }

    return (<>
        <Header />
            <main>
                {selectedGroup ? (
                    <div className={"group-container"}>
                        {selectedGroup}
                        <button className={"back-btn"} type={"submit"} onClick={() => setSelectedGroup(null)}>Back</button>
                    </div>
                ) : (
                    <div>

                        <h2>Tracked Groups</h2>
                        {addGroupPage}
                        <div className={"group-container"}>
                            {groups}
                        </div>
                        <button className={"add-group-btn"} type={"submit"} onClick={(e) => showNewGroupPage(e)}>Create New Group</button>
                    </div>
                )}
            </main>
    </>
    )
}

export default Dashboard;