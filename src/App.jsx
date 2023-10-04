import "./css/App.css";

function App() {

  async function getCurrentCollection(collectionName) {
    let result = await fetch("/get-collection", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({requestedCollection: collectionName})
    });
  }


  return <>
    <p>Hello World</p>
  </>;
}

export default App;
