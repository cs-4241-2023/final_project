let loginTrue = true

function enableLogin(){
    let button = document.getElementById("submitButton")
    button.setAttribute("value", "Login")

    let altText = document.getElementById("altText")
    altText.textContent = "or sign up with new account"

    let form = document.getElementById("loginForm")
    form.setAttribute("action", "/login")
}

function enableSignUp() {
    let button = document.getElementById("submitButton")
    button.setAttribute("value", "Sign Up")

    let altText = document.getElementById("altText")
    altText.textContent = "or login if you have an account"

    let form = document.getElementById("loginForm")
    form.setAttribute("action", "/signup")
}

function toggle(){
    if(loginTrue){
        enableSignUp()
    } else{
        enableLogin()
    }
    loginTrue = !loginTrue
}

window.onload = () => {
    enableLogin()
    let altText = document.getElementById("altText")
    altText.onclick = toggle
}