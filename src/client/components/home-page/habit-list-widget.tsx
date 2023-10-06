import { useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import styled from "styled-components";
import CreateHabitButton from "./create-habit-button";
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



function HabitListWidget(){


    return(
        <BigWidgetStyle className = "rounded">
            {/* <h3>put habit nav buttons here</h3> */}
            <CreateHabitButton />
            {/* put button here, use a callback to call the createHabit function */}
        </BigWidgetStyle> 



    );


}

export default HabitListWidget;