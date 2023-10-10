import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { UserHabit } from "../../../../models";
import PercentIcon from "../shared-components/percent-icon";
import { Method, fetchServer } from "../../scripts/fetch-server";


interface HabitInfoProps {
    habitInfo: UserHabit;
}

const MainDivStyle = styled.div
`
display: flex;
justify-content: space-between;
font-family: ${FONT_THEME.MAIN_FONT};
background-color: ${COLOR_THEME.SECTION};
color: white;
padding: 10px;
margin: 10px;
`

const HabitTitleStyle = styled.h1
`
padding-left: 10px;
display: inline-block;
margin-right: 15px;
transform: translateY(5px);
`

const HabitStreakStyle = styled.img
`
display: inline-block;
width: 2em;
height: 2em;
transform: translateY(-2px);
`
const HabitStreakTextStyle = styled.p<{isHighStreak: boolean}>
`
display: inline-block;
transform: translate(-22px, -1px);

${(props) =>
    props.isHighStreak &&
    `
    transform: translate(-25px,-1px);
    `}
`

const HabitDescriptionStyle = styled.div
`
cursor: pointer;
width: fit-content;
padding: 10px;
transition: background-color 0.3s;
max-width: 100%
white-space: normal;

&:hover {
    background-color: ${COLOR_THEME.SUBSECTION}
}
`

const EditableDescription = styled.textarea
`
width: 100%;
resize: none;
margin-left: 8px;
max-width: 100%;
`
const LoggedDaysStyle = styled.div
`
padding: 10px;
display: flex;
justify-content: center;
transform: translateY(-17px)
`

const HabitInfoRightSide = styled.div
`
margin: 20px 20px 0 0;
display: flex;
align-items: center;
`

const HabitInfoLeftSide = styled.div
`
padding: 10px;
max-width: 50%
`

const PercentSuccessTextStyle = styled.div
`
transform: translateY(-56px);
font-size: 14px;
`

const CalendarImgStyle = styled.img 
`
width: 35px;
height: 35px;
margin-right: 10px;
`

const PercentWidgetStyle = styled.div
`
margin-left: 60px;

`

const LoggedDaysTextStyle = styled.h3
`
margin-top: 30px;
`

const HabitInfoComponent: FC<HabitInfoProps> = ({ habitInfo }) => {
    const [isDescriptionEditing, setDescriptionEditing] = useState(false);
    const [description, setDescription] = useState(habitInfo.description);
    const displayStreak = habitInfo.currentStreak >= 1;
    const isHighStreak = habitInfo.currentStreak > 9;

    const handleDescriptionClick = () => {
        setDescriptionEditing(true);
      };
    
      const handleDescriptionBlur = () => {
        setDescriptionEditing(false);
      };
    
      const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const newDescription = e.target.value;
        setDescription(newDescription);

        const params = {
            habitID: habitInfo.habitID,
            description: newDescription
        }
        console.log("setting new description", newDescription);
        fetchServer(Method.POST, "/setdescription", params).then((response) => {
            console.log(response);
        });

      };

    return(
        <MainDivStyle className="rounded">
            <HabitInfoLeftSide>
                <HabitTitleStyle>{habitInfo.name}</HabitTitleStyle>
                {displayStreak && (
                    <>
                    <HabitStreakStyle src="/fire.svg"></HabitStreakStyle>
                    <HabitStreakTextStyle className="h5" isHighStreak={isHighStreak}>{habitInfo.currentStreak}</HabitStreakTextStyle>
                    </>
                )}
                {isDescriptionEditing ? (
                    <EditableDescription className="rounded" value={description} onChange={handleDescriptionChange} onBlur={handleDescriptionBlur}/> 
                ) : (
                <HabitDescriptionStyle className="rounded" onClick={handleDescriptionClick}>{description}</HabitDescriptionStyle>
                )}
            </HabitInfoLeftSide>

            <HabitInfoRightSide>
                <LoggedDaysStyle className="h3">
                    <div className="text-center">
                        Time Logged
                        <LoggedDaysTextStyle>
                            <CalendarImgStyle src="/calendaricon.png"></CalendarImgStyle>
                            {habitInfo.numLoggedDays} days
                        </LoggedDaysTextStyle> 
                    </div>        
                </LoggedDaysStyle>
                <PercentWidgetStyle className="d-flex flex-column align-items-center">
                    <h3 className="text-center">Week</h3>
                    <div className="d-flex justify-content-center">
                        <PercentIcon percent={habitInfo.percentSuccessWeek}/>
                    </div>
                    <PercentSuccessTextStyle className="text-center">{habitInfo.percentSuccessWeek}%</PercentSuccessTextStyle>
                </PercentWidgetStyle>
                <PercentWidgetStyle className="d-flex flex-column align-items-center">
                    <h3 className="text-center">Lifetime</h3>
                    <div className="d-flex justify-content-center">
                        <PercentIcon percent={habitInfo.percentSuccessLifetime}/> 
                    </div>
                    <PercentSuccessTextStyle className="text-center">{habitInfo.percentSuccessLifetime}%</PercentSuccessTextStyle>
                </PercentWidgetStyle>
            </HabitInfoRightSide> 
        </MainDivStyle>
    )
}

export default HabitInfoComponent;