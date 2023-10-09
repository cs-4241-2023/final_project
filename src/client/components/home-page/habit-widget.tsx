import { useEffect, useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserHabit } from "../../../../models";
import CreateHabitButton from "./create-habit-button";
import { Link } from "react-router-dom";
import { Method, fetchServer } from "../../scripts/fetch-server";
// import "./home-page.css"

  
const StyledButton = styled.button`
background-color: ${COLOR_THEME.BUTTON};
font-family: ${FONT_THEME.BUTTON_FONT};
display: flex;
justify-content: center;
width: 1335px;
margin: 10px 0px 10px 0px;


`


interface HabitWidgetProps {
    habit: UserHabit;
}

// function handleClick({habit}: HabitWidgetProps ) {
//   <p><Link to={"/habit/"+habit.habitID}>{habit.name}</Link></p>

//   console.log('Link clicked!');
// }


function HabitWidget({habit}: HabitWidgetProps){

  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the default button click behavior
    navigate("/habit/" + habit.habitID); // Programmatically navigate to the desired URL
  };


    return(
        <StyledButton className=" btn btn-primary border-0" onClick={handleClick}> 

        <p>
          {habit.name}
            {/* Streak: {habit.currentStreak}
            Number of Logged Days: {habit.numLoggedDays}
            Percent Success Week: {habit.percentSuccessWeek}
            Percent Success Lifetime: {habit.percentSuccessLifetime} */}
            </p>
        
        </StyledButton> 

    );


}

export default HabitWidget;