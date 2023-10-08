import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import CreateHabitButton from "./create-habit-button";
import HabitWidget from "./habit-widget";
// import "./home-page.css"




const BigWidgetStyle = styled.div`
background-color: ${COLOR_THEME.SECTION};
display: flex;
justify-content: center;
padding: 150px 20px 20px 10px;
// margin: 20px;
margin-right: 40px;
margin-left: 40px;

`
const flexBox = styled.b`


`
interface HabitListWidgetProps {
    setUpdate: React.Dispatch<React.SetStateAction<number>>;
}


function HabitListWidget({setUpdate}: HabitListWidgetProps){

    return(
        <BigWidgetStyle className = "rounded">
            {/* <h3>put habit nav buttons here</h3> */}
            <HabitWidget/>
            <CreateHabitButton setUpdate={setUpdate} />
            {/* put button here, use a callback to call the createHabit function */}
        </BigWidgetStyle> 



    );


}

export default HabitListWidget;