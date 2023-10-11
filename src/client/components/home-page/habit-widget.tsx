import { useEffect, useState } from "react";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { NavigateFunction, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PercentIcon from "../shared-components/percent-icon";
import { UserHabit } from "../../../../models";


const StyledButton = styled.button`
background-color: ${COLOR_THEME.SUBSECTION};
font-family: ${FONT_THEME.BUTTON_FONT};
width: 100%;
padding: 10px;
margin-bottom: 10px;
font-size: 20px;
`

const HabitTextStyle = styled.p
`
margin-left: 15px;
margin-right: 10px;
transform: translateY(7px);
`

const CalendarImgStyle = styled.img
  `
width: 35px;
height: 35px;
margin-right: 10px;
`

const GroupStyle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
`

const ThreeWidgetStyle = styled.div`
display: flex;
align-items: center;
min-width: 150px;
`

const PercentStyle = styled.div
`
width: 40px;
height: 40px;
`

const PercentTextStyle = styled.p
`
margin-left: 10px;
transform: translateY(7px);
`

const CalendarStyle = styled.div
`
display: flex;
align-items: center;
justify-content: center;
`

const DeleteButtonImgStyle = styled.img
`
width: 30px;
height: 30px;
`

const DeleteButtonStyle = styled.button
`
background-color: ${COLOR_THEME.SUBSECTION};
`

const HabitStreakStyle = styled.img
`
display: inline-block;
width: 35px;
height: 35px;
transform: translateY(-1px);

`

const HabitStreakTextStyle = styled.p<{isHighStreak: boolean}>
`
display: inline-block;
transform: translate(-23px, 4px);

${(props) =>
    props.isHighStreak &&
    `
    transform: translate(-26px, 4px);
    `}
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

  const displayStreak = habit.currentStreak >= 1;
  const isHighStreak = habit.currentStreak > 9;


  return (
    <StyledButton className=" btn btn-primary rounded border-0" onClick={handleClick}>
      <div className="d-flex justify-content-between align-items-center">
        
        <GroupStyle>
        <HabitTextStyle className="d-flex align-items-center">
          {habit.name}
        </HabitTextStyle>
        
        {displayStreak && (
                    <>
                    <HabitStreakStyle src="/fire.svg"></HabitStreakStyle>
                    <HabitStreakTextStyle className="h5" isHighStreak={isHighStreak}>{habit.currentStreak}</HabitStreakTextStyle>
                    </>
                )}
        </GroupStyle>
        
        <GroupStyle>
          <ThreeWidgetStyle>
            <CalendarStyle>
              <CalendarImgStyle src="/calendaricon.png"></CalendarImgStyle>
              {habit.numLoggedDays} days
            </CalendarStyle>
          </ThreeWidgetStyle>

          <ThreeWidgetStyle>
            <PercentStyle>
              <PercentIcon percent={habit.percentSuccessWeek} />
            </PercentStyle>
            <PercentTextStyle>{habit.percentSuccessWeek}%</PercentTextStyle>
          </ThreeWidgetStyle>


          <ThreeWidgetStyle>
            <PercentStyle>
              <PercentIcon percent={habit.percentSuccessLifetime} />
            </PercentStyle>
            <PercentTextStyle>{habit.percentSuccessLifetime}%</PercentTextStyle>
          </ThreeWidgetStyle>

          <DeleteButtonStyle className="btn btn-primary border-0">
            <DeleteButtonImgStyle src="/trash.png"></DeleteButtonImgStyle>
          </DeleteButtonStyle>

        </GroupStyle>

      </div>
    </StyledButton>

  );
}

export default HabitWidget;