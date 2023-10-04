import "./css/Login.css";
import React from "react";

function Login() {

    return <>
        <h1>Login To Use RendezView</h1>
        <form>
            <input aria-label={"input-username"} type={"text"} placeholder={'username'}/>
            <input aria-label={"password-input"} type={"password"} placeholder={'password'}/>
            <button type={"submit"}>Login</button>
        </form>
    </>

}

export default Login;
