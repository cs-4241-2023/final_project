import React from "react"
import UserLogin from "../user_login/user_login.jsx"
import UserCreation from "../user_creation/user_creation.jsx"
import "bulma/css/bulma.min.css"

function landingPage() {
  return (
    <div class="content is-large has-text-centered">
      <h1 class = "is-family-primary has-text-weight-bold">Fantasy Music Tour Builder</h1>
      <h4 class = "is-family-secondary has-text-weight-semibold"> Existing User? Login here: </h4>
      <UserLogin />
      <h4 class = "is-family-secondary has-text-weight-semibold">New User? Create New Account:</h4>
      <UserCreation />
    </div>
  );
}

export default landingPage;
