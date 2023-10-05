import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { FC } from "react";

const UsernameText = styled.p`
font-family: ${FONT_THEME.USERNAME_FONT};
font-size: 20px;
color: ${COLOR_THEME.TEXT};
display: flex;
justify-content: center;
align-items: center;
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
        <button><img src="assets/logout.svg" width="10" height="10" /></button>
    </UsernameLayoutStyle>
    
);
}

export default UsernameLayout;