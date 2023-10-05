import React, {useState, useRef} from 'react' //useRef provides references to component instances.
import bcrypt from 'bcryptjs'

function userCreation() {

    const [userCreationFeedbackText, setUserCreationFeedbackText] = useState("")
    const newUsernameInputRef = useRef() //The returned object will persist for the full lifetime of the component.
    const newPasswordInputRef = useRef()

    //Use fetch await for form validation
    //Use bcrypt client-side before sending data to server

    function setUserCreationFeedback(message) {

        if(message === "EncryptionError") {
            setUserCreationFeedbackText("There was an encryption error that prevented the creation of a new account for you.")
        } else if(message === "MissingInformation") {
            setUserCreationFeedbackText("The new account information you submitted cannot be saved. There is missing information in at least one input field.")
        } else if(message === "WhitespacePresent") {
            setUserCreationFeedbackText("The new account information you submitted cannot be saved. Both the username and password cannot contain any whitespace.")
        } else if(message === "SuccessfulUserCreation") {
            setUserCreationFeedbackText("Your account has been successfully created. Now login with your new username and password to access Fantasy Music Tour Builder functionality.")
        } else if(message === "UsernameAlreadyExists") {
            setUserCreationFeedbackText("Your account could not be created as there is already a Fantasy Music Tour Builder user with the same username as the one you entered. Choose a different username.")
        }
        
        console.log(message)
    }

    async function handleCreateAccountSubmit(event) {
        event.preventDefault()

        const newUsername = newUsernameInputRef.current.value
        const newPassword = newPasswordInputRef.current.value

        try {
            const salt = await bcrypt.genSalt(10) //A salt is a random data that is used as an additional input to a one-way function that hashes data
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            
            console.log(salt)
            console.log(hashedPassword)

            const response = await fetch('/userCreation', { 
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: newUsername,
                    password: hashedPassword
                }) 
            })
            
            const serverMessage = await response.json() //Here, JSON is parsed to produce a JavaScript object
            setUserCreationFeedback(JSON.stringify(serverMessage))
        } catch {
            setUserCreationFeedback("EncryptionError")
        }
    }

    return (
        <div>
            <h2>
                Create New Account
            </h2>
            <form onSubmit = {handleCreateAccountSubmit}>
                <div>
                    <label htmlFor = "nun">Username</label>
                    <input type = "text" id = "nun" ref = {newUsernameInputRef} name = "newusername"/>
                </div>
                <div>
                    <label htmlFor = "npw">Password</label>
                    <input type = "password" id = "npw" ref = {newPasswordInputRef} name = "newpassword"/>
                </div>
                <button onClick = {handleCreateAccountSubmit}>Submit New Account</button>
            </form>
            <p>{userCreationFeedbackText}</p>
        </div> )
}

export default userCreation