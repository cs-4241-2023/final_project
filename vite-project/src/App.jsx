import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import diverTrak from './assets/divetrak.png';
import diveData from './dives.json';
import './App.css';

import {
  AppBar, Box, Button, Container, Grid,
  Paper, Toolbar, Typography
} from "@mui/material";

import { styled } from '@mui/material/styles'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('');
  const [yog, setYog] = useState('');
  const [team, setTeam] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [loginMessage, setLoginMessage] = useState('');
  const [dives, setDives] = useState([
    { number: '', name: '', difficulty: '', scores: ['', '', ''], total: '', award: '' },
    { number: '', name: '', difficulty: '', scores: ['', '', ''], total: '', award: '' },
    { number: '', name: '', difficulty: '', scores: ['', '', ''], total: '', award: '' },
    { number: '', name: '', difficulty: '', scores: ['', '', ''], total: '', award: '' },
    { number: '', name: '', difficulty: '', scores: ['', '', ''], total: '', award: '' },
    { number: '', name: '', difficulty: '', scores: ['', '', ''], total: '', award: '' }
  ]);

  const [current_page, setUserPage] = useState("Enter Dives")
  const [redraw, forceRedraw] = useState(0);
  const [allDives, setAllDives] = useState([]);
  const [qualDives, setQualDives] = useState([]);
  const [allScores, setAllScores] = useState([]);
  const [qualScores, setQualScores] = useState([]);
  const [currReq, setCurrReq] = useState([]);
  const [currInfo, setUserInfo] = useState([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(currInfo.bio);

  //For Nav Bar
  const pages = ["Enter Dives", "Progress", "Profile"]

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setLoggedIn(true);
      setUsername(loggedInUser);
    } else {
      setLoggedIn(false);
      setUsername('');
      localStorage.clear();
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = {username, password};
    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      if (typeof json.result === "string") {
        setLoginMessage(json.result);
      } else {
        setLoginMessage('');
        setUsername(json.result.username);
        setLoggedIn(true);
        setPassword('');
        localStorage.setItem('user', json.result.username);
      }
    })
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const data = {username, password, yog, recruiting: false, level, team};
    fetch('/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      if (typeof json.result === "string") {
        setLoginMessage(json.result);
      } else {
        setLoginMessage('');
        setUsername(json.result.username);
        setLoggedIn(true);
        setPassword('');
        localStorage.setItem('user', json.result.username);
      }
    })
  }

  const showLogin = () => {
    setLoginForm(true);
  };

  const showRegistration = () => {
    setLoginForm(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const getDives = function () {
    fetch('/getDives', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      setQualDives(json);
      setAllDives(json);
    });
  }

  const getScores = function () {
    fetch('/getScores', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      setAllScores(json);
      setQualScores(json);
    });
  }

  const getRequirements = function () {
    fetch('/getRequirements', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      setCurrReq(json)
      // console.log("req", json);
    });
  }

  const getUserInfo = function () {
    fetch('/getUserInfo', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setUserInfo(json)
      setBio(json.bio)
    });
  }

  // Function to handle changes in dive number selection
const handleDiveNumberChange = (index, value) => {
  // fetch dive info based on the selected dive number
  const diveInfo = getDiveInfo(value);
  // Update the state with the selected dive number, name, and difficulty
  const newDives = [...dives];
  const dive = newDives[index];
  dive.number = value;
  dive.name = diveInfo.name;
  dive.difficulty = parseFloat(diveInfo.difficulty);
  newDives[index] = dive;
  setDives(newDives);
};

// Function to fetch dive information based on the selected dive number
const getDiveInfo = (code) => {
  const dive = diveData.dives.find((dive) => dive.code === code);
  return dive;
};

// Function to handle changes in dive scores
const handleDiveScoreChange = (index, scoreIndex, value) => {
  const newDives = [...dives];
  const dive = newDives[index];
  dive.scores[scoreIndex] = Number(value);
  dive.total = dive.scores.reduce((acc, score) => acc + score, 0);
  dive.award = dive.total > 0 ? parseFloat((dive.total * dive.difficulty).toFixed(1)) : 0;
  newDives[index] = dive;
  setDives(newDives);
}

const handleSubmit = () => {
  // Filter out non-empty dives
  const nonEmptyDives = dives.filter((dive) => (
    dive.number !== '' && 
    dive.name !== '' && 
    dive.difficulty !== '' && 
    dive.scores[0] !== '' && dive.scores[1] !== '' && dive.scores[2] !== ''
  ));

  // If there are no non-empty dives, do nothing
  if (nonEmptyDives.length === 0) {
    alert('Enter at least one dive before submitting.');
    return;
  }

  // send a post request to the server with the dive data
  const data = nonEmptyDives.map((dive) => ({
    username,
    code: dive.number,
    english_name: dive.name,
    difficulty: dive.difficulty,
    scores: dive.scores,
    total: dive.total,
    award: dive.award
  }));
  console.log(data);
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(alert('Dives submitted successfully!'));
}

  const filterQualDives = (e) => {

    if (e.target.checked) {
      const filteredDives = allDives.filter(dive => dive.qualified === true)
      // console.log(filteredDives)
      forceRedraw(redraw + 1)
      setQualDives(filteredDives)
    } else {
      setQualDives(allDives)
    }

  }

  const filterQualScores = (e) => {
    if (e.target.checked) {
      console.log(allScores);
      const filteredScores = allScores.filter(score => score.total_score > 180)
      // console.log(filteredScores)
      forceRedraw(redraw + 1)
      setQualScores(filteredScores)
    } else {
      setQualScores(allScores)
    }
  }

  const handleMenuNav = (pg) => {
    let nameOfPage = pg.page
    console.log(nameOfPage)
    //current_page = nameOfPage;
    if (nameOfPage === "Progress") {
      unstable_batchedUpdates(() => {
        getDives();
        getScores();
        getRequirements();
      });
    } else if (nameOfPage === "Profile") {
      unstable_batchedUpdates(() => {
        getUserInfo();
      });
    }
    setUserPage(nameOfPage);
  }

  const submitEdit = (e) => {
    // submit put request to server with new bio and recruit status
    fetch('/editProfile', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({bio, recruiting: currInfo.recruiting})
    })
    .then(alert('Profile updated successfully!'))
    .then(getUserInfo())
    .then(setEditing(false));
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      {loggedIn ? (<div>
        <AppBar position="absolute">
          <Container maxWidth="xl">
            <Toolbar disableGutters >
              <Typography>DiverTrak</Typography>
              <Box id="menu-appbar" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'flex-end' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    id={page}
                    onClick={(e) => handleMenuNav({page})}
                    sx={{ my: 2, color: 'white', display: 'block' }}>
                    {page}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {(current_page === "Enter Dives") ? (
          <div>
            <h1>Welcome, {username}!</h1>
            <div id="dive-input">
              <h3>Enter Dive Data</h3>
              <table>
                <thead>
                  <tr>
                    <th>Dive Number</th>
                    <th>Dive Name</th>
                    <th>Difficulty</th>
                    <th>Score 1</th>
                    <th>Score 2</th>
                    <th>Score 3</th>
                    <th>Net Total</th>
                    <th>Award</th>
                  </tr>
                </thead>
                <tbody>
                  {dives.map((dive, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          value={dive.number}
                          onChange={(e) => handleDiveNumberChange(index, e.target.value)}
                        >
                          <option key={-1} value="">Select</option>
                          {diveData.dives.map((diveOption) => (
                            <option key={diveOption.code} value={diveOption.code}>
                              {diveOption.code}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{dive.name}</td>
                      <td>{dive.difficulty}</td>
                      <td>
                        <input
                          onChange={(e) => handleDiveScoreChange(index, 0, e.target.value)}
                          type="number"
                          min="0"
                        />
                      </td>
                      <td>
                        <input
                          onChange={(e) => handleDiveScoreChange(index, 1, e.target.value)}
                          type="number"
                          min="0"
                        />
                      </td>
                      <td>
                        <input
                          onChange={(e) => handleDiveScoreChange(index, 2, e.target.value)}
                          type="number"
                          min="0"
                        />
                      </td>
                      <td>{dive.total}</td>
                      <td>{dive.award}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleSubmit}>Submit</button>
            </div>  
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (null)}
        {(current_page === "Progress") ? (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div id="tableSide">
                  <p>Below shows all the dives you have competed this season</p>

                  <label className="switch"> Display Qualified Dives Only
                    <input id="filterQualCheck" onChange={e => { filterQualDives(e) }} type="checkbox" />
                    <span className="slider round"></span>
                  </label>

                  <table className="borderDives">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Dive</th>
                        <th>English Name</th>
                        <th>Score</th>
                      </tr>
                    </thead>

                    <tbody>
                      {qualDives.map(dive =>
                        <tr>
                          <td>{new Date(dive.date_competed).toDateString()}</td>
                          <td>{dive.code}</td>
                          <td>{dive.english_name}</td>
                          <td>{dive.scores.join()}</td>
                        </tr>
                      )}
                    </tbody>

                  </table>

                  <br></br>
                  <label className="switch"> Display Qualified Scores Only
                    <input id="filterQualCheck" onChange={e => { filterQualScores(e) }} type="checkbox" />
                    <span className="slider round"></span>
                  </label>
                  <table className="borderDives">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Score</th>
                      </tr>
                    </thead>

                    <tbody>
                      {qualScores.map(score =>
                        <tr>
                          <td>{new Date(score.date_earned).toDateString()}</td>
                          <td>{score.total_score}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                    
                </div>
              </Grid>

              <Grid item xs={4}>
                <div>
                  <p>Requirements Met</p>
                  {currReq ? (currReq.map(requirement =>
                    requirement.met ?
                      (<p className="borderMet">{requirement.name}</p>) : ("")

                  )) : "No requirements found"}

                  <p>Still Need to Meet</p>
                  {currReq ? (currReq.map(requirement =>
                    !requirement.met ?
                      (<p className="borderUnmet">{requirement.name}</p>) : ("")

                  )) : "No requirements found"}

                </div>
              </Grid>
            </Grid>
          </div>
        ) : (null)}
        {(current_page === "Profile") ? (
          <div>
            <Grid container spacing={4}>
              <Grid item xs={4}><Item>User: {currInfo.username}</Item></Grid>
              <Grid item xs={4}><Item>Team: {currInfo.team}</Item></Grid>
              <Grid item xs={4}><Item>Class: {currInfo.yog}</Item></Grid>
              <Grid item xs={7}>{ editing ? (
                <textarea
                  id="userBio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="4"
                  cols="50"
                />) : (<Item id="userBio">Bio: {bio}</Item>
                )}
              </Grid>
              <Grid item xs={5} columnSpacing={4}>
                <Grid item>
                  {editing ? (
                    <label> Actively Recruiting?
                      <input id="recruitStatus" onChange={e => { setUserInfo({ ...currInfo, recruiting: e.target.checked }) }} type="checkbox" />
                    </label>
                  ) : (<Item id="recruitStatus">Actively Recruiting?: {currInfo.recruiting ? "Yes" : "No"}</Item>)
                  }
                </Grid>
                <Grid item><Item>Requirements Met: {currReq ? (currReq.map(requirement =>
                  requirement.met ?
                    (<p className="borderMet">{requirement.name}</p>) : ("")

                )) : "No requirements found"}</Item></Grid>
                <Grid item>
                  <Item>
                    <p>Highest Total Score</p>
                    <p>{currInfo.highest_total_score}</p> 
                  </Item>
                </Grid>
              </Grid>
            </Grid>
            {!editing ? (<Button onClick={() => setEditing(true)} id="editButton">Edit Profile</Button>) :
            (<Button onClick={submitEdit} id="submitEditButton">Save Changes</Button>)}
          </div>
        ) : (null)}

      </div>) : (
        <>
        <img src={diverTrak} />
          {loginForm ? (
            <div id="login-form">
            <form>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br /><br />
    
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br /><br />
    
            <button type="submit" id="login" onClick={handleLogin}>Login</button><br /><br />
            </form>
            <p>{loginMessage}</p>
            <a href="#" onClick={showRegistration}>Don't have an account? Register here</a>
        </div>
          ) : (
      <form onSubmit={handleRegister}>
      <label htmlFor="level">Level:</label>
      <input
        type="text"
        id="level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        placeholder="student"
        required
      /><br /><br />

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Insert username here"
        required
      /><br /><br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Insert password here"
        required
      /><br /><br />

      <label htmlFor="yog">Year of Graduation:</label>
      <input
        type="number"
        id="yog"
        value={yog}
        placeholder="2024"
        onChange={(e) => setYog(parseInt(e.target.value))}
      /><br /><br />


      <label htmlFor="team">Team:</label>
      <input
        type="text"
        id="team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        placeholder="WPI"
        required
      /><br /><br />
      <button type="submit" id="register">Register</button><br /><br />
      <p>{loginMessage}</p>
      <a href="#" onClick={showLogin}>Have an account already? Sign in here.</a>
    </form>
          )}
        </>
      )}
    </>
  )
}

export default App
