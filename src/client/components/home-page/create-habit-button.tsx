import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import styled from "styled-components";
// import "./home-page.css"



  
  const StyledButton = styled.button`
  background-color: ${COLOR_THEME.BUTTON};
  font-family: ${FONT_THEME.BUTTON_FONT};
  display: flex;
  justify-content: center;
  width: 2500px;
  
  `




function CreateHabitButton(){


    return(

        <StyledButton className=" btn btn-primary border-0"> 
        + Create New Habit
        </StyledButton>       

    );


}

export default CreateHabitButton;