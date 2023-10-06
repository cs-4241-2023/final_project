import { FC, useState } from "react";
import styled from "styled-components";
import { COLOR_THEME, FONT_THEME } from "../../themes";
import { Link } from "react-router-dom";
import { UserHabit } from "../../../../models";


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
padding-left: 8px;
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
const HabitStreakTextStyle = styled.p
`
display: inline-block;
transform: translate(-23px,-2px);
`

const HabitDescriptionStyle = styled.div
`
cursor: pointer;
width: fit-content;
padding: 8px;
transition: background-color 0.3s;

&:hover {
    background-color: ${COLOR_THEME.SUBSECTION}
}
`

const EditableDescription = styled.textarea`
  width: 100%;
  resize: none;
  margin-left: 8px;
  `;

const HabitInfoComponent: FC<HabitInfoProps> = ({ habitInfo }) => {
    const [isDescriptionEditing, setDescriptionEditing] = useState(false);
    const [description, setDescription] = useState(habitInfo.description);
    const displayStreak = habitInfo.currentStreak >= 1;

    const handleDescriptionClick = () => {
        setDescriptionEditing(true);
      };
    
      const handleDescriptionBlur = () => {
        setDescriptionEditing(false);
      };
    
      const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
      };

    return(
        <MainDivStyle className="rounded">
            <div>
                <HabitTitleStyle>{habitInfo.name}</HabitTitleStyle>
                {displayStreak && (
                    <>
                    <HabitStreakStyle src="/fire.svg"></HabitStreakStyle>
                    <HabitStreakTextStyle>{habitInfo.currentStreak}</HabitStreakTextStyle>
                    </>
                )}
                {isDescriptionEditing ? (
                    <EditableDescription className="rounded" value={description} onChange={handleDescriptionChange} onBlur={handleDescriptionBlur}/> 
                ) : (
                <HabitDescriptionStyle className="rounded" onClick={handleDescriptionClick}>{description}</HabitDescriptionStyle>
                )}
            </div>
            <div>
            </div> 
        </MainDivStyle>
    )
}

export default HabitInfoComponent;