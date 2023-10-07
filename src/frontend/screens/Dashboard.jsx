import React from "react";
import "../css/Dashboard.css"

function Dashboard() {
    const [groupHTML, setGroupHTML] = React.useState([]);
    const [addGroupPage, setAddGroupPage] = React.useState(<></>);
    const [collectionName, setCollectionName] = React.useState("TestUserCollection"); // TODO: Brandon, however you implement authentication set this variable to the correct collection name
    const [dataChanged, setDataChanged] = React.useState(false);

    React.useEffect(() => {
        getCurrentCollection(collectionName).then((data) => {

            let groupArr = []

            data.forEach((group) => {
                let listItems = []
                group.groupUsers.split(",").forEach((user) => {
                    listItems.push(<li key={listItems.length}>{user.trim()}</li>);
                });

                groupArr.push(
                    <div className={"group"} key={groupArr.length}>
                        <h3>{group.groupName}</h3>
                        <p>{group.groupDescription}</p>
                        <ul>
                            {listItems}
                        </ul>
                        <p>Possible Group Meeting Times: {group.meetingTimes}</p>
                        <button className={"group-btn"} type={"submit"} onClick={() => {
                            // TODO: Switch to group page
                        }}>Go To Group Page</button>
                        <button className={"delete-btn"} type={"submit"} onClick={(e) => deleteGroup(e, group._id)}>Delete Group</button>
                    </div>
                );
                setGroupHTML(groupArr);
                setDataChanged(false);
            });
        }
        );
    }, [dataChanged]);

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

    return <>
        <button className={"profile-btn"} type={"submit"} onClick={() => {
            // TODO: Switch to accounts page
        }}>Profile/Settings</button>
        <header>
            <h1>RendezView Dashboard</h1>
            <p>Welcome to RendezView. Please select an existing group or create a new one.</p>
        </header>

        <main>
            <h2>Tracked Groups</h2>
            {addGroupPage}
            <div className={"group-container"}>
                {groupHTML}
            </div>
            <button className={"add-group-btn"} type={"submit"} onClick={(e) => showNewGroupPage(e)}>Create New Group</button>
        </main>
    </>
}

export default Dashboard;