import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import CreateHabitButton from "./create-habit-button";
import HabitWidget from "./habit-widget";
// import "./home-page.css"
import { UserHabit } from "../../../../models";

interface HabitListWidgetProps {
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
    habits: UserHabit[];
}

const BigWidgetStyle = styled.div`
background-color: ${COLOR_THEME.SECTION};
display: flex;
flex-direction: column;
justify-content: center;
padding: 30px 0 30px 0;
width: 75%;
`

const HabitWidgetStyle = styled.div
`
display: flex;
justify-content: center;
align-items: center;
margin: 0 2.5% 0 2.5%;
`


function HabitListWidget({setUpdate, habits}: HabitListWidgetProps ){

    const sortFunc = (a: UserHabit, b: UserHabit) => {
        return b.currentStreak - a.currentStreak;
    }

    // delete habit as a client-only operation for responsiveness while server catches up
    const deleteHabitClientSide = (habit: UserHabit) => {
        habits.splice(habits.indexOf(habit), 1);
    }
    
    // create habit as a client-only operation for responsiveness while server catches up
    const createHabitClientSide = (habitName: string) => {
        habits.push(new UserHabit("-1", "-1", habitName, "", 0, 0, 0, 0, 0));
    }

    return( <>
        <BigWidgetStyle className = "rounded">
            {habits.sort(sortFunc).map((habit) => (<>
             <HabitWidgetStyle><HabitWidget habit={habit} setUpdate={setUpdate} deleteHabitClientSide={deleteHabitClientSide}/></HabitWidgetStyle>  
             </>))}
            <div className="d-flex justify-content-center"><CreateHabitButton setUpdate={setUpdate} createHabitClientSide={createHabitClientSide}/></div>
        </BigWidgetStyle> 
</>
    );
}

export default HabitListWidget;