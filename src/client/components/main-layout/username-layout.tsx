import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { FC } from "react";

const UsernameText = styled.p`
font-family: ${FONT_THEME.USERNAME_FONT};
font-size: 20px;
color: ${COLOR_THEME.TEXT};
line-height: 0;
vertical-align: baseline;
text-align: center;
transform: translateY(8px);
`

const LogoutButton = styled.button`
background-color: transparent;
`

const UsernameLayoutStyle = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
gap: 10px;
`

interface UsernameLayoutProps {
    username: string;
  }
  
const UsernameLayout: FC<UsernameLayoutProps> = ({ username }) => {
return (
    <UsernameLayoutStyle>
        <UsernameText>{username}</UsernameText>
        <LogoutButton><img src="/logout.png" width="20" height="20" /></LogoutButton>
    </UsernameLayoutStyle>
    
);
}

export default UsernameLayout;