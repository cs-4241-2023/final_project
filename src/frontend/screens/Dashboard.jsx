import React from "react";
import "../css/Dashboard.css"

function Dashboard() {

    const [collectionData, setCollectionData] = React.useState([]);

    async function getCurrentCollection(collectionName) {
        let result = await fetch("/get-collection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ requestedCollection: collectionName }),
        });
        if (result.status !== 404) {
            let data = await result.json();
            setCollectionData(data);
        } else {
            console.log("404: Collection Not Found!");
            setCollectionData([]);
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
                <h2>Groups</h2>
                <div className={"group"}>
                    <h3>MQP</h3>
                    <ul>
                        <li>Samuel Karkache</li>
                        <li>Brandon Vuong</li>
                    </ul>
                </div>

                <div className={"group"}>
                    <h3>MQP</h3>
                    <p>Project Group for MQP. We are doing a CS project.</p>
                    <ul>
                        <li>Samuel Karkache</li>
                        <li>Brandon Vuong</li>
                    </ul>
                    <button className={"edit-btn"} type={"submit"}>Edit</button>
                </div>
            </div>
        </main>




    </>
}

export default Dashboard;