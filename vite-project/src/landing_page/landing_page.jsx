import React from "react"
import UserLogin from '../user_login/user_login.jsx'
import UserCreation from '../user_creation/user_creation.jsx'

function landingPage() {
    return (
        <div>
            <h1>Fantasy Music Tour Builder</h1>
            <UserLogin />
            <UserCreation />
        </div>
    )
}

export default landingPage