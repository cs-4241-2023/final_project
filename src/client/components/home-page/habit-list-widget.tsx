import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import CreateHabitButton from "./create-habit-button";
import HabitWidget from "./habit-widget";
import "./home-page.css"

const BigWidgetStyle = styled.div`
background-color: ${COLOR_THEME.SECTION};
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
padding: 20px 10px 20px 10px;
margin-right: 40px;
margin-left: 40px;


  
`
interface HabitListWidgetProps {
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
}


function HabitListWidget({setUpdate}: HabitListWidgetProps){

    return( <>
        <BigWidgetStyle className = "rounded">
            {/* <div><HabitWidget/></div>
            <div><HabitWidget/></div>
            <div><HabitWidget/></div>  
            <div><HabitWidget/></div>   */}
            <div><CreateHabitButton setUpdate={setUpdate} /></div>

            </BigWidgetStyle> 

</>




    );


}

export default HabitListWidget;