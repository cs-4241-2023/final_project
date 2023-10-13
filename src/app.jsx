import React, { useState, useEffect } from "react";
import "./styles/app.css";

function App() {
  const [clicks, setClicks] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(0.02);
  const [upgrades, setUpgrades] = useState([
    { id: 1, name: "ASIC Miner", cost: 10, multiplier: 2 },
    { id: 2, name: "Mining Farm", cost: 50, multiplier: 5 },
  ]);
  const [autoclickers, setAutoclickers] = useState([
    { id: 1, name: "Basic Autoclicker", cost: 20, clicksPerSecond: 0.02, upgradeCost:10, upgradeInc: 0.01 },
    { id: 2, name: "Advanced Autoclicker", cost: 50, clicksPerSecond: 0.05, upgradeCost:25, upgradeInc: 0.02 }]);
  const [mapAutoclickers, setMapAutoclickers] = useState([{ id: 1, name: "Basic Autoclicker", cost: 20, clicksPerSecond: 0.02, upgradeCost:10, upgradeInc: 0.01 },
    { id: 2, name: "Advanced Autoclicker", cost: 50, clicksPerSecond: 0.05, upgradeCost:25, upgradeInc: 0.02 }]);

  const loadGame = () => {
    if (localStorage.getItem("user") !== null) {
      fetch( '/load', {
        method:'POST',
        body: JSON.stringify({ user:localStorage.getItem("user") }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then( response => response.json() )
      .then( json => {
        setClicks(parseFloat(json.clicks))
        setClickMultiplier(parseFloat(json.clickMultiplier))
        setUpgrades(json.upgrades)
        setAutoclickers(json.autoclickers)
        setMapAutoclickers(json.mapAutoclickers)
      })
      loginVisibility(false)
    } else {
      setClicks(0)
      setClickMultiplier(0.02)
      setUpgrades([
        { id: 1, name: "ASIC Miner", cost: 10, multiplier: 2 },
        { id: 2, name: "Mining Farm", cost: 50, multiplier: 5 },
      ])
      setAutoclickers([
        { id: 1, name: "Basic Autoclicker", cost: 20, clicksPerSecond: 0.02, upgradeCost:10, upgradeInc: 0.01 },
        { id: 2, name: "Advanced Autoclicker", cost: 50, clicksPerSecond: 0.05, upgradeCost:25, upgradeInc: 0.02 }])
      setMapAutoclickers([
        { id: 1, name: "Basic Autoclicker", cost: 20, clicksPerSecond: 0.02, upgradeCost:10, upgradeInc: 0.01 },
        { id: 2, name: "Advanced Autoclicker", cost: 50, clicksPerSecond: 0.05, upgradeCost:25, upgradeInc: 0.02 }])
      loginVisibility(true)
    }
    
  }
  
  useEffect(() => {
    loadGame()
  }, []);

  const saveGame = () => {
    if (localStorage.getItem("user") == null) {
      return
    }

    const savedClicks = clicks
    const savedMult = clickMultiplier
    const savedUpgrades = upgrades
    const savedAutoclickers = autoclickers
    const savedMapAutoclickers = mapAutoclickers

    fetch( '/save', {
      method:'POST',
      body: JSON.stringify({ user:localStorage.getItem("user"), clicks:savedClicks, clickMultiplier:savedMult, upgrades:savedUpgrades, autoclickers:savedAutoclickers, mapAutoclickers:savedMapAutoclickers }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      return
    })
  };

  const handleUpgradeClick = (upgrade) => {
    if (clicks >= upgrade.cost) {
      playBuyAudio();
      setClicks(clicks - upgrade.cost);
      setClickMultiplier(clickMultiplier * upgrade.multiplier);

      const updatedUpgrades = upgrades.map((u) =>
        u.id === upgrade.id ? { ...u, cost: (u.cost * 1.5).toFixed(0) } : u
      );

      setUpgrades(updatedUpgrades);
      saveGame();
    } else {
      alert("Not enough BTC to purchase this upgrade!");
    }
  };

  const handleAutoclickerPurchase = (autoclicker) => {
    if (clicks >= autoclicker.cost) {
      playBuyAudio();
      setClicks(clicks - autoclicker.cost);
      setAutoclickers([...autoclickers, autoclicker]);
      const thisAutoClicker = autoclickers.find((clicker) => clicker.name === autoclicker.name);
      const thisMapAutoClicker = mapAutoclickers.find((clicker) => clicker.name === autoclicker.name);
      thisAutoClicker.cost = (Math.round(thisAutoClicker.cost * 130)/100);
      thisMapAutoClicker.cost = (Math.round(thisMapAutoClicker.cost * 130)/100);
      saveGame();
    } else {
      alert("Not enough BTC to purchase this autoclicker!");
    }
  };

  /* TODO: implement Upgrade Functionality so that autoclicker rate increases with upgrade purchase */
  const handleUpgradeAutoclicker = (autoclicker) => {
    if (clicks >= autoclicker.upgradeCost) {
      playBuyAudio();
      setClicks(clicks - autoclicker.upgradeCost);
      const thisAutoClicker = autoclickers.find((clicker) => clicker.name === autoclicker.name);
      const thisMapAutoClicker = mapAutoclickers.find((clicker) => clicker.name === autoclicker.name);
      thisAutoClicker.clicksPerSecond = (Math.round(thisAutoClicker.clicksPerSecond * 150)/100);
      thisAutoClicker.upgradeCost = (Math.round(thisAutoClicker.upgradeCost * 130)/100);
      thisMapAutoClicker.clicksPerSecond = (Math.round(thisMapAutoClicker.clicksPerSecond * 150)/100);
      thisMapAutoClicker.upgradeCost = (Math.round(thisMapAutoClicker.upgradeCost * 130)/100);
      saveGame();
    } else {
      alert("Not enough BTC to upgrade this autoclicker!");
    }
  };

  
  const fixHundreths = (value) =>{
    return value.toFixed(2);
  }

  useEffect(() => {
    const autoclickerInterval = setInterval(() => {
      setClicks((prevClicks) => prevClicks + calculateAutoclickerClicks());
    }, 1000);

    return () => clearInterval(autoclickerInterval);
  }, [autoclickers]);

  const calculateAutoclickerClicks = () => {
    return autoclickers.reduce((totalClicks, autoclicker) => {
      return totalClicks + autoclicker.clicksPerSecond;
    }, 0);
  };

  useEffect(() => {
    document.title = `Bitcoins: ${clicks.toFixed(2)}`;
  }, [clicks]);

  var audio = document.getElementById("clickAudio");

  function playClickAudio() {
    audio.play();
  }

  var audio2 = document.getElementById("buyAudio");

  function playBuyAudio() {
    audio2.play();
  }

  function clickCommand() {
    playClickAudio();
    setClicks(clicks + clickMultiplier);
  }
  
  const accountLoad = async (username) => {
    localStorage.setItem("user", username)
    await loadGame()
    loginVisibility(false)
  }
  
  const loginVisibility = (state) => {
    if (state) {
      document.querySelector('#login-area').style.display = "block"
      document.querySelector('#login-area').style.visibility = "visible"
      document.querySelector('#logout-area').style.display = "none"
      document.querySelector('#logout-area').style.visibility = "hidden"
    } else {
      document.querySelector('#login-area').style.display = "none"
      document.querySelector('#login-area').style.visibility = "hidden"
      document.querySelector('#logout-area').style.display = "block"
      document.querySelector('#logout-area').style.visibility = "visible"
    }
  }
  
  const login = () => {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    
    fetch( '/login', {
      method:'POST',
      body: JSON.stringify({ user:username, pass:password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      if (json) {
        accountLoad(username)
      } else {
        alert("Incorrect Password or Account Does not Exist")
      }
    })
  }
  
  function createAccount() {
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    
    if (username == '') {
      alert("Account name already exists")
      return
    }
    fetch( '/createAccount', {
      method:'POST',
      body: JSON.stringify({ user:username, pass:password, clicks:0, clickMultiplier:0.02, 
        upgrades:[ 
          { id: 1, name: "ASIC Miner", cost: 10, multiplier: 2 }, 
          { id: 2, name: "Mining Farm", cost: 50, multiplier: 5 }], 
        autoclickers:[
          { id: 1, name: "Basic Autoclicker", cost: 20, clicksPerSecond: 0.02, upgradeCost:10, upgradeInc: 0.01 },
          { id: 2, name: "Advanced Autoclicker", cost: 50, clicksPerSecond: 0.05, upgradeCost:25, upgradeInc: 0.02 }],
        mapAutoclickers:[
          { id: 1, name: "Basic Autoclicker", cost: 20, clicksPerSecond: 0.02, upgradeCost:10, upgradeInc: 0.01 },
          { id: 2, name: "Advanced Autoclicker", cost: 50, clicksPerSecond: 0.05, upgradeCost:25, upgradeInc: 0.02 }]
        }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      if (json) {
        accountLoad(username)
      } else {
        alert("Account name already exists")
      }
    })
  }
  
  const logout = () => {
    localStorage.removeItem("user")
    loadGame()
    loginVisibility(true)
    document.querySelector('#username').value = ''
    document.querySelector('#password').value = ''
    document.querySelector('#deletePassword').value = ''
  }
  
  const deleteAccount = () => {
    const password = document.querySelector('#deletePassword').value
    
    fetch( '/deleteAccount', {
      method:'POST',
      body: JSON.stringify({ user:localStorage.getItem("user"), pass:password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
      if (json) {
        alert('Account Successfully Deleted')
        localStorage.removeItem("user")
        loadGame()
        loginVisibility(true)
        document.querySelector('#username').value = ''
        document.querySelector('#password').value = ''
        document.querySelector('#deletePassword').value = ''
      } else {
        alert('Incorrect Password - Account not Deleted')
      }
    })
  }

  return (
    <div className="center">
      <header>
        <h1>Bitcoin Clicker</h1>
      </header>
      <main>
        <div className="click-area">
          <p id="coinCount">Bitcoins: {clicks.toFixed(2)}</p>
          <p id="stats">Bitcoins/sec: {autoclickers.reduce((n, {clicksPerSecond}) => n + clicksPerSecond, 0).toFixed(2)}</p>
          <p id="stats">Bitcoins/click: {clickMultiplier.toFixed(2)}</p>
          <img
            id="coinImg"
            src="https://cdn.glitch.global/2aed1049-e279-41f2-9340-36a2d3b9edd4/bitcoin-image.png?v=1696637556830"
            onClick={() => clickCommand()}
          ></img>
        </div>
        <div className="upgrades">
          <h2>Upgrades</h2>
          <ul>
            {upgrades.map((upgrade) => (
              <li key={upgrade.id}>
                <strong>{upgrade.name}</strong> - Cost: {upgrade.cost} BTC
                <br />
                <button
                  id="purchaseButton"
                  className="purchase"
                  onClick={() => handleUpgradeClick(upgrade)}
                >
                  Purchase
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="autoclickers">
          <h2>Autoclickers</h2>
          <ul>
            {mapAutoclickers.map((autoclicker) => (
              <li key={autoclicker.id}>
                <strong>{autoclicker.name}</strong> -{" "}
                {autoclicker.clicksPerSecond} bitcoins/sec <br /> Cost: {autoclicker.cost}{" "}
                BTC <br /> Upgrade: {autoclicker.upgradeCost}{" "}BTC <br /> Owned: {autoclickers.filter((clicker) => clicker.name === autoclicker.name).length}
                <br />
                <button
                  id="purchaseButton"
                  className="purchase"
                  onClick={() => handleAutoclickerPurchase(autoclicker)}
                >
                  Purchase
                </button>
                <button
                  id="upgradeClicker"
                  className="upgrade"
                  onClick={() => handleUpgradeAutoclicker(autoclicker)}
                >
                  Upgrade
                </button>
              </li>
            ))}
          </ul>
        </div>
        <br/>
        <div id="login-area">
          <h2 id="login-area-txt">Login/Create Account</h2>
          <br/>
          <strong>Username:</strong>
          <br />
          <input type="text" id="username" defaultValue="" />
          <br/>
          <strong>Password:</strong>
          <br />
          <input type="password" id="password" defaultValue="" />
          <br/>
        
          <button id="loginButton" className="login" onClick={() => login()}>
            Login
          </button>
          <button id="createButton" className="create" onClick={() => createAccount()}>
            Create Account
          </button>
        </div>
        <div id="logout-area">
          <strong>Account: {localStorage.getItem("user")}</strong>
          <br/>
          <button id="saveButton" className="save" onClick={() => saveGame()}>
            Save Status
          </button>
          <br/>
          <button id="logoutButton" className="logout" onClick={() => logout()}>
            Logout
          </button>
          <br/>
          <div id="deleteArea">
            <h2>Delete Account (Cannot Be Reversed)</h2>
            <br/>
            <strong>Enter Password to Delete Account:</strong>
            <input type="password" id="deletePassword" defaultValue="" />
            <br/>
            <button id="logoutButton" className="deleteAccount" onClick={() => deleteAccount()}>
              Delete
            </button>
          </div>
        </div>
      </main>
      <audio id="clickAudio">
        <source
          src="https://cdn.glitch.global/2aed1049-e279-41f2-9340-36a2d3b9edd4/clickAudio.mp3?v=1697060759089"
          type="audio/mpeg"
        />
      </audio>
      <audio id="buyAudio">
        <source
          src="https://cdn.glitch.global/2aed1049-e279-41f2-9340-36a2d3b9edd4/buyAudio.mp3?v=1697060761689"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
