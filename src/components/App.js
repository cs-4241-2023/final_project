import logo from '../logo.svg';
import '../css/App.css';
import {useState, useEffect} from 'react'
import { redirect } from 'react-router-dom';
const domain = "http://localhost:2048"


function App() {
  const [er, setEr] = useState("")

  async function insertUser(e) {
    e.preventDefault()
    let name = document.getElementById('usernameInput').value
    let pass =  document.getElementById('passwordInput').value
    let user = {username: name, password: pass};
    if(name === "" || pass === ""){
      setEr("Please enter username and password");
    }
    else{
      let result = await fetch(`${domain}/insert`, {
      method: "post",
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify(user)
      })
      if(result.status === 400){
        setEr("This user already exists");
      }
    }
    resetInputs()
  }

  async function deleteUser(e){
    e.preventDefault()
    let name = document.getElementById('usernameInput').value
    let pass =  document.getElementById('passwordInput').value
    let user = {username: name, password: pass};
    if(name === "" || pass === ""){
      setEr("Please enter username and password");
    }
    else{
      let res = await fetch(`${domain}/delete`, {
        method: "post",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(user)
      })
      if(res.status === 400){
        setEr("This user does not exists in the database");
      }
    }
    resetInputs()
  }

  async function validateUser(e){
    e.preventDefault();
    let name = document.getElementById('loginUsername').value;
    let pass = document.getElementById('loginPassword').value;
    if(name === "" || pass === ""){
      setEr("Please enter a username and password");
    }
    else{
      (fetch(`${domain}/validate`, {
        method: "post",
        body: JSON.stringify({username: name, password: pass}),
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
      })).then((res) => {
        if(res.status === 400){
          setEr("Incorrect credentials")
        }
        else{
          window.location.replace("/dealPage")
        }
      })
    }
    resetInputs()
  }

  function resetInputs(){
    document.getElementById('loginPassword').value = ""
    document.getElementById('loginUsername').value = ""
    document.getElementById('passwordInput').value = ""
    document.getElementById('usernameInput').value = ""
  }

  return (
    <div className="App">
      <div className="App-header">
        <div id="forms">
          <form>
            <h2 className='sectionHeader'>Login to Application</h2>
            <label htmlFor="loginUsername">Username</label>
            <input type="text" id="loginUsername" placeholder="Enter Username"></input>
            <br></br>
            <label htmlFor="loginPassword">Password</label>
            <input type="password" id="loginPassword" placeholder="Enter Password"></input>
            <br></br>
            <button id="loginButton" onClick={(e) => validateUser(e)}>Login</button>
          </form>
          <form>
            <h2 className='sectionHeader'>Manage Accounts</h2>
            <label htmlFor="usernameInput">Username</label>
            <input type="text" id="usernameInput" placeholder="Username"></input>
            <br></br>
            <label htmlFor="passwordInput">Password</label>
            <input type = "password" id="passwordInput" placeholder="Password"></input>
            <br></br>
            <button onClick={(e) => insertUser(e)}>Create User</button>
            <button onClick={(e) => deleteUser(e)}>Delete User</button>
          </form>
        </div>

        <span id="errorText">{er}</span>
      </div>
    </div>
  );
}

export default App;