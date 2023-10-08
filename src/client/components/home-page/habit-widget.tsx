import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import CreateHabitButton from "./create-habit-button";
// import "./home-page.css"

  
const StyledButton = styled.button`
background-color: ${COLOR_THEME.BUTTON};
font-family: ${FONT_THEME.BUTTON_FONT};
display: flex;
justify-content: center;
width: 2500px;

`


interface HabitWidget {
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
}


function HabitWidget(){

    return(
        <StyledButton className=" btn btn-primary border-0"> 
        Click here to nav to habit
        </StyledButton>    
        
    );


}

export default HabitWidget;