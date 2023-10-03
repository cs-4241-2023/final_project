import { FC } from "react";
import { Link } from "react-router-dom";
import { AuthType } from "../../models/enums";
import styled from "styled-components";
import TextField from "./text-field";

import "./login-page.css"
import { Title } from "../css-components/title";
import { COLOR_THEME, FONT_THEME } from "../../themes";

const SubmitButton = styled.button`
background-color: ${COLOR_THEME.LOGIN_BACKGROUND};
border: 3px solid ${COLOR_THEME.TEXT};
color: ${COLOR_THEME.TEXT};
font-family: ${FONT_THEME.BUTTON_FONT};
top-margin: 2vh;
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

const Spacer = styled.div`

`

const End = styled.section`
margin-bottom: 20px;
`

interface LoginProps {
    authType: AuthType;
}


const LoginPage: FC<LoginProps> = ({ authType }) => {

    return <LoginStyle>
        <Spacer style={{height: "15vh"}}/>
        <section id = "welcomeText"><h1>{authType === AuthType.LOGIN ? "Your motivation begins here." : "Create your DailyDive Account!"}</h1></section>
        <Spacer style={{height: "15vh"}}/>
        <LoginBody>
            <TextField inputID="username" placeholder="Username" hideText={false}></TextField>
            <TextField inputID="password" placeholder="Password" hideText={authType === AuthType.LOGIN}></TextField>
            <SubmitButton id = "submit">{authType === AuthType.LOGIN ? "Login" : "Create Account"}</SubmitButton>
            <Link to={authType === AuthType.LOGIN ? "/register" : "/"} id="switchAuth"><LinkText>{authType === AuthType.LOGIN ? "Or create an account..." : "Already a user? Log in."}</LinkText></Link>
        </LoginBody>
        <Spacer style={{height: "20vh"}}/>
        <End> <Title>DailyDive</Title> </End>
    </LoginStyle>
    
}
  
export default LoginPage;