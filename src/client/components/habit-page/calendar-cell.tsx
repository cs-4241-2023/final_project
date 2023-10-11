import { FC, useEffect, useState } from "react";
import { Outcome } from "../../../../models";
import styled from "styled-components";
import { darken } from 'polished';

import { COLOR_THEME } from "../../themes";
import { Method, fetchServer } from "../../scripts/fetch-server";
import { set } from "mongoose";

type CellProps = {
    color: string;
    disableHover?: boolean;
  };

const Cell = styled.div<CellProps>`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px; 
  font-size: 16px;
  margin: 2px;
  background-color: ${(props) => props.color};

  cursor: ${(props) => props.disableHover ? 'default' : 'pointer'}; // setting the cursor

  ${(props) => !props.disableHover && `
    &:hover {
      background-color: ${darken(0.05, props.color!)};
    }
  `}

`

const CellText = styled.p`
    font-size: 30px;
    font-weight: bold;
    color: white;
    line-height: 1;
    transform: translateY(7px);
`

const CellTextU = styled(CellText)`
    border: 3px solid white;
    padding: 10px;
    border-radius: 100%;
`   

interface CellComponentProps {
    habitID: string,
    year: number,
    month: number,
    day: number,
    outcome: Outcome,
    today: number, // -1 is before today, 0 is today, 1 is after
    setUpdate: React.Dispatch<React.SetStateAction<number>>,
}

function getColor(outcome: Outcome, today: number): string {

    if (today > 0) return COLOR_THEME.OUTCOME_FUTURE;

    if (outcome === Outcome.SUCCESS) {
        return COLOR_THEME.OUTCOME_SUCCESS;
    } else if (outcome === Outcome.FAIL) {
        return COLOR_THEME.OUTCOME_FAIL;
    } else {
        return COLOR_THEME.SUBSECTION;
    }
}

// for an empty cell, set day = -1 to make it invisible
const CalendarCellComponent: FC<CellComponentProps> = ({habitID, year, month, day, outcome, today, setUpdate}) => {

    const [myOutcome, setMyOutcome] = useState<Outcome>(outcome);

    useEffect(() => {
        setMyOutcome(outcome);
    }, [year, month]);

    const onClick = () => {
        console.log("clicked", day);

        let newOutcome;
        if (myOutcome === Outcome.SUCCESS) {
            newOutcome = Outcome.FAIL;
        } else if (myOutcome === Outcome.FAIL) {
            newOutcome = Outcome.NONE;
        } else {
            newOutcome = Outcome.SUCCESS;
        }
        setMyOutcome(newOutcome);

        const params = {
            habitID: habitID,
            year: year, 
            month: month,
            day: day,
            outcome: newOutcome as string,
        }

        fetchServer(Method.POST, "/habitoutcome", params).then((res) => {
            console.log("/habitoutcome repsonse:", res);
            setUpdate((update) => update + 1);
        });

    }

    const CellTextStyle = (today === 0) ? CellTextU : CellText;
    
    return <Cell disableHover={today > 0} onClick={today > 0 ? undefined : onClick} style={{opacity : day === -1 ? 0 : 1}} color={getColor(myOutcome, today)}><CellTextStyle>{day}</CellTextStyle></Cell>
};

export default CalendarCellComponent;