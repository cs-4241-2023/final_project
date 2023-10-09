import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import styled from "styled-components";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import HabitWidget from "./habit-widget";
// import "./home-page.css"



  
  const StyledButton = styled.button`
  background-color: ${COLOR_THEME.BUTTON};
  font-family: ${FONT_THEME.BUTTON_FONT};
  display: flex;
  justify-content: center;
  width: 1335px;
  margin: 10px 0px 10px 0px;
  
  `
  interface CreateHabitButtonProps {
    setUpdate: React.Dispatch<React.SetStateAction<number>>;

}

const createHabit = async (navigate: NavigateFunction, setUpdate:  React.Dispatch<React.SetStateAction<number>>) => {
      console.log("create habit");
  
      const habitName = prompt("Enter habit name:");
      if (habitName === null) return;
  
      const response = verifyAuth(navigate, await fetchServer(Method.POST, "/createhabit", {name: habitName}));
      console.log(response);
  
      // refresh
      setUpdate((update) => update + 1);
  };


function CreateHabitButton({setUpdate}: CreateHabitButtonProps){

    const navigate = useNavigate();

    const handleCreateHabit = async () => {
        //  Call the callback function to create a habit
        await createHabit(navigate, setUpdate);
      };
    
    
    return( <>

        <StyledButton className=" btn btn-primary border-0" onClick={handleCreateHabit}> 
        + Create New Habit
        </StyledButton>     

        </>  

    );


}

export default CreateHabitButton;