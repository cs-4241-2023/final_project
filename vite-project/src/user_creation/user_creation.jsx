import React, {useRef} from 'react' //useRef provides references to component instances.
import bcrypt from 'bcryptjs'

function userCreation() {

    const newUsernameInputRef = useRef() //The returned object will persist for the full lifetime of the component.
    const newPasswordInputRef = useRef()

    //Use fetch await for form validation
    //Use bcrypt client-side before sending data to server

    async function handleCreateAccountSubmit(event) {
        event.preventDefault()
        
        const userCreationFeedbackDivision = document.getElementById("userCreationFeedbackInfo")
        const userCreationFeedbackDivisionParagraph = document.createElement('p')

        const newUsername = newUsernameInputRef.current.value
        const newPassword = newPasswordInputRef.current.value

        function displayUserCreationFeedback(message) {
            if(document.getElementById("userCreationFeedbackDivisionParagraphPresent") !== null) {
                userCreationFeedbackDivision.removeChild(userCreationFeedbackDivisionParagraph)
            }
    
            userCreationFeedbackDivisionParagraph.innerText = message
            userCreationFeedbackDivision.appendChild(userCreationFeedbackDivisionParagraph)
            userCreationFeedbackDivisionParagraph.setAttribute("id", "userCreationFeedbackDivisionParagraphPresent")
        }

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
            
            const feedback = await response.json() //Here, JSON is parsed to produce a JavaScript object
            displayUserCreationFeedback(JSON.stringify(feedback))
        } catch {
            displayUserCreationFeedback("There was an encryption error that prevented the creation of a new account for you")
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
                <button>Login</button>
            </form>
            <div id = "userCreationFeedbackInfo"></div>
        </div> )
}

export default userCreation