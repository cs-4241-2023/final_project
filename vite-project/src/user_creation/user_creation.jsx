import React, {useState} from 'react'

function userCreation() {

    const [userCreationError] = useState("")

    if(userCreationError === "") {
        return (
            <div>
                <h2>
                    Create New Account
                </h2>
                <form action = "/createAccount" method = "POST">
                    <div>
                        <label htmlFor = "nun">Username</label>
                        <input type = "text" id = "nun" name = "newusername"/>
                    </div>
                    <div>
                        <label htmlFor = "npw">Password</label>
                        <input type = "password" id = "npw" name = "newpassword"/>
                    </div>
                    <button>Login</button>
                </form>
            </div> )
    } else if (userCreationError === "MissingInformation") {
        
    }
    
}

export default userCreation