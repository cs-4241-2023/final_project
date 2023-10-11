import React from "react";
import UserLogin from "../user_login/user_login.jsx";
import UserCreation from "../user_creation/user_creation.jsx";

function landingPage() {
  return (
    <div class="content is-large has-text-centered">
      <h1>Fantasy Music Tour Builder</h1>
      <h4> Existing User? Login here: </h4>
      <UserLogin />
      <h4>New User? Create New Account:</h4>
      <UserCreation />
    </div>
  );
}

export default landingPage;
