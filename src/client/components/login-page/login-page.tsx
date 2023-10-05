import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthType } from "../../models/enums";
import styled from "styled-components";
import TextField from "./text-field";

import "./login-page.css"
import { Title } from "../css-components/title";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import React from "react";
import { Method, fetchServer } from "../../scripts/fetch-server";

const SubmitButton = styled.button`
background-color: ${COLOR_THEME.LOGIN_BACKGROUND};
border: 3px solid ${COLOR_THEME.TEXT};
color: ${COLOR_THEME.TEXT};
font-family: ${FONT_THEME.BUTTON_FONT};
`

const LoginStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
background-color: ${COLOR_THEME.LOGIN_BACKGROUND};
color: ${COLOR_THEME.TEXT};
font-family: ${FONT_THEME.MAIN_FONT};
`

const LoginBody = styled.section`
display: flex;
flex-direction: column;
gap: 20px;
align-items: center;
text-align: center;
`

const LinkText = styled.u`
font-family: ${FONT_THEME.BUTTON_FONT};
color: ${COLOR_THEME.TEXT};
`

const Message = styled.p`
color: red;
line-height: 0;
font-size: 12px;
`

const Spacer = styled.div`

`

const End = styled.section`
margin-bottom: 20px;
`

interface LoginProps {
    authType: AuthType;
}





const LoginPage: FC<LoginProps> = ({ authType }) => {

    const navigate = useNavigate();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [error, setError] = React.useState("");

    const onSubmit = async () => {

        const response = await fetchServer(Method.POST, authType === AuthType.LOGIN ? "/login" : "/signup", {username: username, password: password});

        
        if (response.status === 200) { // sucessful login, go to home page
            console.log("Login successful, navigating to home page");
            navigate('/home');

        } else { // display error message
            console.log("Login failed, displaying error message");
            setError(response.content.message);
        }
    };


    return <LoginStyle>
        <Spacer style={{height: "15vh"}}/>
        <section id = "welcomeText"><h1>{authType === AuthType.LOGIN ? "Your motivation begins here." : "Create your DailyDive Account!"}</h1></section>
        <Spacer style={{height: "15vh"}}/>
        <LoginBody>
            <TextField value={username} setValue={setUsername} placeholder="Username" hideText={false}></TextField>
            <div>
                <TextField value={password} setValue={setPassword} placeholder="Password" hideText={authType === AuthType.LOGIN}></TextField>
                <Message>{error}</Message>
            </div>
            <SubmitButton id = "submit" onClick={onSubmit} >{authType === AuthType.LOGIN ? "Login" : "Create Account"}</SubmitButton>
            <Link to={authType === AuthType.LOGIN ? "/register" : "/"} id="switchAuth"><LinkText>{authType === AuthType.LOGIN ? "Or create an account..." : "Already a user? Log in."}</LinkText></Link>
        </LoginBody>
        <Spacer style={{height: "20vh"}}/>
        <End> <Title>DailyDive</Title> </End>
    </LoginStyle>
    
}
  
export default LoginPage;