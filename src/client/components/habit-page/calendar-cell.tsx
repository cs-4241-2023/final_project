import { FC, useState } from "react";
import { Outcome } from "../../../../models";
import styled from "styled-components";
import { darken } from 'polished';

import { COLOR_THEME } from "../../themes";
import { Method, fetchServer } from "../../scripts/fetch-server";
import { set } from "mongoose";

const Cell = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; 
  font-size: 16px;
  background-color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) => darken(0.05, props.color!)};
  }

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
    habitID: string,
    year: number,
    month: number,
    day: number,
    outcome: Outcome,
    isToday: boolean,
    setUpdate: React.Dispatch<React.SetStateAction<number>>,
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
const CalendarCellComponent: FC<CellComponentProps> = ({habitID, year, month, day, outcome, isToday, setUpdate}) => {

    const [myOutcome, setMyOutcome] = useState<Outcome>(outcome);

    const onClick = () => {
        console.log("clicked", day);

        if (myOutcome === Outcome.SUCCESS) {
            setMyOutcome(Outcome.FAIL);
        } else if (myOutcome === Outcome.FAIL) {
            setMyOutcome(Outcome.NONE);
        } else {
            setMyOutcome(Outcome.SUCCESS);
        }

        const params = {
            habitID: habitID,
            year: year, 
            month: month,
            day: day,
            outcome: myOutcome as string,
        }

        fetchServer(Method.POST, "/habitoutcome", params).then((res) => {
            console.log("/habitoutcome repsonse:", res);
            setUpdate((update) => update + 1);
        });

    }

    const CellTextStyle = isToday ? CellTextU : CellText;
    
    return <Cell onClick={onClick} style={{opacity : day === -1 ? 0 : 1}} color={getColor(myOutcome)}><CellTextStyle>{day}</CellTextStyle></Cell>
};

export default CalendarCellComponent;