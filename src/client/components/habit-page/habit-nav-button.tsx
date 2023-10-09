import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { COLOR_THEME, FONT_THEME } from "../../themes";

interface ButtonComponentProps {
    icon: string;
    label: ReactNode;
    isStatisticsButton?: boolean;
    isFriendButton?: boolean;
  }
  
  const ButtonStyle = styled.button`
  background-color: ${COLOR_THEME.BUTTON};
  font-family: ${FONT_THEME.BUTTON_FONT};
  color: white;
  font-size: 18px;
  `
  const StatisticsButtonStyle = styled(ButtonStyle)`
    margin-right: 10px;
  `
  const Icon = styled.img`
  width: 1em;
  height: 1em;
  margin-right: 10px;
  `
  const FriendIcon = styled(Icon)`
  width: 1.5em;
  height: 1.5em;
  `

const ButtonComponent: FC<ButtonComponentProps> = ({ icon, label, isStatisticsButton, isFriendButton }) => {
    const StyledButton = isStatisticsButton ? StatisticsButtonStyle : ButtonStyle;
    const StyledIcon = isFriendButton ? FriendIcon : Icon;

    return (
        <StyledButton className="btn btn-primary border-0"><StyledIcon src={icon}/>{label}</StyledButton>
    );
}

export default ButtonComponent;