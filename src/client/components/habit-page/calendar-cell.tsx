import { FC } from "react";
import { Outcome } from "../../../../models";
import styled from "styled-components";
import { COLOR_THEME } from "../../themes";

const Cell = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; 
  font-size: 16px;
  background-color: ${(props) => props.color};
`

const CellText = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: white;
`

const CellTextU = styled(CellText)`
    text-decoration: underline;
`   

interface CellComponentProps {
    day: number,
    outcome: Outcome,
    isToday: boolean,
}

function getColor(outcome: Outcome): string {
    if (outcome === Outcome.SUCCESS) {
        return COLOR_THEME.OUTCOME_SUCCESS;
    } else if (outcome === Outcome.FAIL) {
        return COLOR_THEME.OUTCOME_FAIL;
    } else {
        return COLOR_THEME.SUBSECTION;
    }
}

// for an empty cell, set day = -1 to make it invisible
const CalendarCellComponent: FC<CellComponentProps> = ({day, outcome, isToday}) => {

    const CellTextStyle = isToday ? CellTextU : CellText;
    
    return <Cell style={{opacity : day === -1 ? 0 : 1}} color={getColor(outcome)}><CellTextStyle>{day}</CellTextStyle></Cell>
};

export default CalendarCellComponent;