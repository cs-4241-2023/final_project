import React, {useRef} from 'react' //useRef provides references to component instances.

function userLogin() {

    const usernameInputRef = useRef()
    const passwordInputRef = useRef()

    const userLoginFeedbackDivision = document.getElementById("userLoginFeedbackInfo") //Need to fix bug here on 10/4/23
    const userLoginFeedbackDivisionParagraph = document.createElement("p")
    
    //Use fetch await for form validation
    //Use bcrypt client-side before sending data to server

    async function handleLoginSubmit(event) {
        event.preventDefault()
        
        const loginUsername = usernameInputRef.current.value
        const loginPassword = passwordInputRef.current.value

        function displayUserLoginFeedback(message) {

            if(document.getElementById("userLoginFeedbackDivisionParagraphPresent") !== null) {
                userLoginFeedbackDivision.removeChild(userLoginFeedbackDivisionParagraph)
            }

            if(message === "MissingInformation") {
                userLoginFeedbackDivisionParagraph.innerText = "The login information you submitted cannot be saved. There is missing information in at least one input field."
            } else if(message === "WhitespacePresent") {
                userLoginFeedbackDivisionParagraph.innerText = "The login information you submitted cannot be saved. Both the username and password cannot contain any whitespace."
            } else if(message === "UserNotFound") {
                userLoginFeedbackDivisionParagraph.innerText = "User not found."
            } else if(message === "IncorrectPassword") {
                userLoginFeedbackDivisionParagraph.innerText = "Incorrect password entered."
            } else if(message === "InternalServerError") {
                userLoginFeedbackDivisionParagraph.innerText = "There was an internal server error that prevented successful login."
            }
            
            console.log(message)
            userLoginFeedbackDivision.appendChild(userLoginFeedbackDivisionParagraph)
            userLoginFeedbackDivisionParagraph.setAttribute("id", "userLoginFeedbackDivisionParagraphPresent")
        }

        const response = await fetch('/userLogin', { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: loginUsername,
                password: loginPassword
            }) 
        })
            
        const serverMessage = await response.json() //Here, JSON is parsed to produce a JavaScript object  
        
        if(serverMessage === "SuccessfulUserAuthentication.") {
            //Redirect to page with main functionality.
            console.log("Logged in.")
        } else {
            displayUserLoginFeedback(JSON.stringify(serverMessage))
        }
    }
    
    return (
        <div>
            <h2>
                Login
            </h2>
            <form onSubmit = {handleLoginSubmit}>
                <div>
                    <label htmlFor = "un">Username</label>
                    <input type = "text" id = "un" ref = {usernameInputRef} name = "username"/>
                </div>
                <div>
                    <label htmlFor = "pw">Password</label>
                    <input type = "password" id = "pw" ref = {passwordInputRef} name = "password"/>
                </div>
                <button>Login</button>
            </form>
            <div id = "userLoginFeedbackInfo"></div>
        </div> )
}

export default userLogin