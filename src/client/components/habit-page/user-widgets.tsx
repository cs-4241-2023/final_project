import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { UserHabit } from "../../../../models";

interface UserWidgetProps {
    habitInfo: UserHabit;
}

const HabitInfoRightSide = styled.div
`
padding-right: 10px;
`

const MainDivStyle = styled.div
`
display: flex;
justify-content: space-between;
font-family: ${FONT_THEME.MAIN_FONT};
background-color: ${COLOR_THEME.SECTION};
color: white;
padding: 10px;
margin: 10px;
`

const UserWidgetComponent: FC<UserWidgetProps> = ({ habitInfo }) => {
    return (
    <MainDivStyle>
        <HabitInfoRightSide className="h3">
            Logged Days: {habitInfo.numLoggedDays} days
        </HabitInfoRightSide>
        <HabitInfoRightSide className="h3">
            Weekly Success: {habitInfo.percentSuccessWeek}%
        </HabitInfoRightSide>
        <HabitInfoRightSide className="h3">
            Lifetime Success: {habitInfo.percentSuccessLifetime}%
        </HabitInfoRightSide>
    </MainDivStyle> 
    )
}

export default UserWidgetComponent;