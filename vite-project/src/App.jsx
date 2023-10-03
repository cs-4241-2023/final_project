import {useState} from 'react'
import UserLogin from './user_login/user_login.jsx'
import UserCreation from './user_creation/user_creation.jsx'

//JSX converts HTML into React elements
//Files grouped by feature

function App() {
  return (
    <>
      <h1>Fantasy Music Tour Builder</h1>
      <UserLogin />
      <UserCreation />
    </>
  )
}

export default App
