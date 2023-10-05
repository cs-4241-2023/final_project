import React from "react";
import "../css/Dashboard.css"

function Dashboard() {
    const [groupHTML, setGroupHTML] = React.useState([]);
    const [addGroupPage, setAddGroupPage] = React.useState(<></>);
    const [collectionName, setCollectionName] = React.useState("TestUserCollection"); // TODO: This needs to be set based on the user
    const [dataChanged, setDataChanged] = React.useState(false);

    React.useEffect( () => {
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
                                <button className={"edit-btn"} type={"submit"} onClick={() => {
                                    // TODO: Switch to group page
                                }}>Edit</button>
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

    async function showNewGroupPage() {
        setAddGroupPage(
            <div className={"add-group-page"}>
                <h2>Add a Group</h2>
                <form onSubmit={(e) => addGroup(e)}>
                    <input id={"groupName"} type={"text"} placeholder={"group name"}/>
                    <input id={"groupDescription"} type={"text"} placeholder={"group description"}/>
                    <input id={"groupUsers"} type={"text"} placeholder={"group users (separate each user with a comma)"}/>
                    <button onClick={()=> {setAddGroupPage(<></>)}}>Cancel</button>
                    <button type={"submit"}>Submit</button>
                </form>
            </div>
        )
    }

    async function addGroup(e) {
        e.preventDefault()

        let form = e.target.elements;

        let groupJSON = JSON.stringify({
            collection: collectionName,
            groupName: form.groupName.value,
            groupDescription: form.groupDescription.value,
            groupUsers: form.groupUsers.value
        });

        let result = await fetch("/add-group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: groupJSON
        });
        setDataChanged(true);
        setAddGroupPage(<></>)
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
            {addGroupPage}
            <div className={"group-container"}>
                 {groupHTML}
            </div>
            <button className={"add-group-btn"} type={"submit"} onClick={() => showNewGroupPage()}>Create New Group</button>
        </main>
    </>
}

export default Dashboard;