import React, {useState, useEffect, useRef} from 'react' //useRef provides references to component instances.
import {useNavigate} from 'react-router-dom'

function userLogin() {

    //The state object is where you store property values that belong to the component.
    //When the state object changes, the component re-renders.
    const [userLoginFeedbackText, setUserLoginFeedbackText] = useState("")
    const navigate = useNavigate()
    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    //Use fetch await for form validation
    //Use bcrypt client-side before sending data to server

    useEffect(() => {
        console.log(userLoginFeedbackText)
    }, [userLoginFeedbackText])

    async function handleLoginSubmit(event) {
        event.preventDefault()
        
        const loginUsername = usernameInputRef.current.value
        const loginPassword = passwordInputRef.current.value

        const response = await fetch('/userLogin', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            }) 
        })
            
        const message = await response.text() //Here, JSON is parsed to produce a JavaScript object  
        //const message = JSON.stringify(serverMessage)
       
        if(message === "SuccessfulUserAuthentication.") {
            //Redirect to page with main functionality.
            navigate("/music_tour_builder")
        } else {
            if(message === "MissingInformation") {
                setUserLoginFeedbackText("The login information you submitted is invalid. There is missing information in at least one input field.")
            } else if(message === "WhitespacePresent") {
                setUserLoginFeedbackText("The login information you submitted is invalid. Both the username and password cannot contain any whitespace.")
            } else if(message === "UserNotFound") {
                setUserLoginFeedbackText("User not found.")
            } else if(message === "IncorrectPassword") {
                setUserLoginFeedbackText("Incorrect password entered.")
            } else if(message === "InternalServerError") {
                setUserLoginFeedbackText("There was an internal server error that prevented successful login.")
            }         
        }

        console.log(message)  
    }
    
    return (
        <div>
            <h2>
                Login
            </h2>
            <form>
                <div>
                    <label htmlFor = "un">Username</label>
                    <input type = "text" id = "un" ref = {usernameInputRef} name = "username"/>
                </div>
                <div>
                    <label htmlFor = "pw">Password</label>
                    <input type = "password" id = "pw" ref = {passwordInputRef} name = "password"/>
                </div>
                    <button onClick = {handleLoginSubmit}>Login</button>
            </form>
            <p>{userLoginFeedbackText}</p>
        </div> )
}

export default userLogin