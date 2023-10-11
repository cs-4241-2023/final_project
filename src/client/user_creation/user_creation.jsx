import React, {useState, useEffect, useRef} from 'react' //useRef provides references to component instances.

function userCreation() {

    const [userCreationFeedbackText, setUserCreationFeedbackText] = useState("")
    const newUsernameInputRef = useRef() //The returned object will persist for the full lifetime of the component.
    const newPasswordInputRef = useRef()

    //Use fetch await for form validation
    //Use bcrypt client-side before sending data to server

    useEffect(() => {
        console.log(userCreationFeedbackText)
    }, [userCreationFeedbackText])


    async function handleCreateAccountSubmit(event) {
        event.preventDefault()

        const newUsername = newUsernameInputRef.current.value
        const newPassword = newPasswordInputRef.current.value  

        const response = await fetch('/userCreation', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: newUsername,
                password: newPassword
            }) 
        })
            
        const message = await response.text() //Here, we await a text response.
            
        if(message === "ServerError") {
            setUserCreationFeedbackText("There was a server error that prevented the creation of a new account for you.")
        } else if(message === "MissingInformation") {
            setUserCreationFeedbackText("The new account information you submitted cannot be saved. There is missing information in at least one input field.")
        } else if(message === "WhitespacePresent") {
            setUserCreationFeedbackText("The new account information you submitted cannot be saved. Both the username and password cannot contain any whitespace.")
        } else if(message === "SuccessfulUserCreation") {
            setUserCreationFeedbackText("Your account has been successfully created. Now login with your new username and password to access Fantasy Music Tour Builder functionality.")
        } else if(message === "UsernameAlreadyExists") {
            setUserCreationFeedbackText("Your account could not be created as there is already a Fantasy Music Tour Builder user with the same username as the one you entered. Choose a different username.")
        }
    }

    return (
        <div>
            <h2>
                Create New Account
            </h2>
            <form>
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