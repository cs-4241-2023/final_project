import React, {useRef} from 'react' //useRef provides references to component instances.

function userLogin() {

    const usernameInputRef = useRef()
    const passwordInputRef = useRef()
    
    //Use fetch await for form validation
    //Use bcrypt client-side before sending data to server

    async function handleLoginSubmit(event) {
        event.preventDefault()
        
        const userLoginFeedbackDivision = document.getElementById("userLoginFeedbackInfo")
        const userLoginFeedbackDivisionParagraph = document.createElement('p')

        const loginUsername = usernameInputRef.current.value
        const loginPassword = passwordInputRef.current.value

        function displayUserLoginFeedback(message) {
            if(document.getElementById("userLoginFeedbackDivisionParagraphPresent") !== null) {
                userLoginFeedbackDivision.removeChild(userLoginFeedbackDivisionParagraph)
            }
    
            userLoginFeedbackDivisionParagraph.innerText = message
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
            
        const feedback = await response.json() //Here, JSON is parsed to produce a JavaScript object  
        
        if(feedback === "SuccessfulUserAuthentication") {
            //Redirect to page with main functionality.
        } else {
            displayUserLoginFeedback(JSON.stringify(feedback))
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
            <div id = "userLoginFeedbackDivision"></div>
        </div> )
}

export default userLogin