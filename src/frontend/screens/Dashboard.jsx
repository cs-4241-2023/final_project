import React from "react";
import "../css/Dashboard.css"

function Dashboard() {

    const [collectionData, setCollectionData] = React.useState([]);
    const [groupHTML, setGroupHTML] = React.useState([]);

    React.useEffect( () => {
        getCurrentCollection("TestUserCollection").then((data) => {
            let groupArr = []
                data.forEach((group) => {

                    let listItems = []

                    group.groupUsers.split(",").forEach((user) => {
                        listItems.push(
                            <li key={listItems.length}>{user.trim()}</li>
                        )
                    });

                    groupArr.push(
                            <div className={"group"} key={groupArr.length}>
                                <h3>{group.groupName}</h3>
                                <p>{group.groupDescription}</p>
                                <ul>
                                    {listItems}
                                </ul>
                                <button className={"edit-btn"} type={"submit"}>Edit</button>
                            </div>
                    );
                    setGroupHTML(groupArr);
                });
            }
        );
    }, []);

    async function getCurrentCollection(collectionName) {
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


    return <>
        <button className={"profile-btn"} type={"submit"}>Profile/Settings</button>
        <header>
            <h1>RendezView Dashboard</h1>
            <p>Welcome to RendezView. Please select an existing group or create a new one.</p>
        </header>

        <main>
            <div className={"group-container"}>
                {groupHTML}
            </div>
        </main>
    </>
}

export default Dashboard;