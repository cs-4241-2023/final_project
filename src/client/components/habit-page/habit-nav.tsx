import { FC } from "react";
import React from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import ButtonComponent from "./habit-nav-button";

const ButtonContainerStyle = styled.div`
background-color: ${COLOR_THEME.SECTION};
display: flex;
justify-content: space-between;
padding: 10px;
margin: 10px;
`
function HabitNavComponent() {
    return (
        <ButtonContainerStyle className="rounded">
            <ButtonComponent icon="/back.png" label="My Habits"/>
            <div>
                <ButtonComponent icon="/Pie-chart-03.svg" label="Statistics" isStatisticsButton/>
                <ButtonComponent icon="/friends.png" label="Compete" isFriendButton/>
            </div>
        </ButtonContainerStyle>
    );
}

export default HabitNavComponent;