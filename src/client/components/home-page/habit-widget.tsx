import { useEffect, useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PercentIcon from "../shared-components/percent-icon";
import { UserHabit } from "../../../../models";
import CreateHabitButton from "./create-habit-button";
import { Link } from "react-router-dom";
import { Method, fetchServer } from "../../scripts/fetch-server";
import HabitInfoComponent from "../habit-page/habit-info";
// import "./home-page.css"


const StyledButton = styled.button`
background-color: ${COLOR_THEME.SUBSECTION};
font-family: ${FONT_THEME.BUTTON_FONT};
display: flex;
justify-content: flex-start;
width: 100%;
margin-bottom: 10px;
`

const ContainerStyle = styled.div`
// justify-content: center;
// align-items: center;

`

const HabitTextStyle = styled.p
  `
transform: translateY(10px);
`

const CalendarImgStyle = styled.img
  `
width: 35px;
height: 35px;
margin-right: 10px;
`

const RightStyle = styled.div`
margin: 0px 0px 0px 0px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;

`

const ThreeWidgetStyle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 8px 8px 8px;
`

const PercentStyle = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin: 0px 8px 0px 0px;

`
const CalendarStyle = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin: 0px 8px 0px 0px;



`



interface HabitWidgetProps {
  habit: UserHabit;
}

// function handleClick({habit}: HabitWidgetProps ) {
//   <p><Link to={"/habit/"+habit.habitID}>{habit.name}</Link></p>

//   console.log('Link clicked!');
// }

function HabitWidget({ habit }: HabitWidgetProps) {

  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevent the default button click behavior
    navigate("/habit/" + habit.habitID); // Programmatically navigate to the desired URL
  };


  return (
    <StyledButton className=" btn btn-primary rounded border-0" onClick={handleClick}>
      <ContainerStyle className="d-flex justify-content-between">
        <div>
          {habit.name}
        </div>
        <RightStyle>
        <ThreeWidgetStyle>
          <CalendarStyle>
          <CalendarImgStyle src="/calendaricon.png"></CalendarImgStyle>
          {habit.numLoggedDays} days
          </CalendarStyle>
          </ThreeWidgetStyle>

          <ThreeWidgetStyle>
          <PercentStyle>
            <PercentIcon percent={habit.percentSuccessWeek} />
            <p>{habit.percentSuccessWeek}%</p>
          </PercentStyle>
          </ThreeWidgetStyle>


          <ThreeWidgetStyle>
          <PercentStyle>
            <PercentIcon percent={habit.percentSuccessLifetime} />
            <p>{habit.percentSuccessLifetime}%</p> 
          </PercentStyle>
        </ThreeWidgetStyle>

        </RightStyle>


      </ContainerStyle>
    </StyledButton>

  );
}

export default HabitWidget;