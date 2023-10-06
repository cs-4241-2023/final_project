import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { FC } from "react";
import { Method, fetchServer } from "../../scripts/fetch-server";
import { useNavigate } from "react-router-dom";

const UsernameText = styled.p`
font-family: ${FONT_THEME.USERNAME_FONT};
font-size: 20px;
color: ${COLOR_THEME.TEXT};
line-height: 0;
vertical-align: baseline;
text-align: center;
transform: translate(5px, 6px);
`

const LogoutButton = styled.button`
background-color: transparent;
`

const UsernameLayoutStyle = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
gap: 0px;
`

interface UsernameLayoutProps {
    username: string;
  }
  
const UsernameLayout: FC<UsernameLayoutProps> = ({ username }) => {
    

    const navigate = useNavigate();
    const onLogout = () => {
        console.log("logout");
        fetchServer(Method.POST, "/logout").then((res) => {
            navigate("/");
        });
        
    }

return (
    <UsernameLayoutStyle>
        <UsernameText>{username}</UsernameText>
        <LogoutButton onClick={onLogout}><img src="/logout.png" width="30" height="30" /></LogoutButton>
    </UsernameLayoutStyle>
    
);
}

export default UsernameLayout;