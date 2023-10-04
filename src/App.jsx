import "./css/App.css";

function App() {

  async function getCurrentCollection(collectionName) {
    let result = await fetch("/get-collection", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({requestedCollection: collectionName})
    });
    if(result.status !== 404) {
      let data = await result.json();
      console.log(data)
    } else {
      console.log("404: Collection Not Found!")
    }
  }

  return <>
    <h1>RendezView</h1>
    <p>The best project work scheduling app for college students!</p>
    <button onClick={() => getCurrentCollection("Users")}>Click to Test</button>
  </>;
}

export default App;
