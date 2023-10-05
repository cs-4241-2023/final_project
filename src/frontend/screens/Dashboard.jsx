import React from "react";
import "../css/Dashboard.css"
import "../hooks/DashboardHooks.jsx"

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


    </>
}

export default Dashboard;