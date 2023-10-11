import { FC, useEffect, useState } from "react";
import { getDateToday } from "../../scripts/date";
import { get } from "http";
import { HabitOutcome, Outcome } from "../../../../models";
import { Loading } from "../css-components/loading";
import CalendarCellComponent from "./calendar-cell";
import { Method, fetchServer } from "../../scripts/fetch-server";
import styled from "styled-components";
import { FONT_THEME, COLOR_THEME } from "../../themes";

function getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

// Get the start weekday (sun=0, mon=1, etc) of the month
function getStartWeekday(month: number, year: number) {
    return new Date(year, month, 1).getDay();
}

// find the outcome on a given day.
// precondition: the outcomes are all on the same month as the day
function getOutcomeOnDay(outcomes: HabitOutcome[], day: number): Outcome {

    for (let i = 0; i < outcomes.length; i++) {
        const outcome = outcomes[i];

        if (outcome.day === day) return outcome.outcome;
    }
    return Outcome.NONE;
}

function getMonthString(month: number) {
    switch (month) {
        case 0: return "January";
        case 1: return "Feburary";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        default: return "December";
    }
}

// return -1 if dateA is before dateB, 0 if equal, 1 if after
function compareDates(yearA: number, monthA: number, dayA: number, yearB: number, monthB: number, dayB: number) {
    if (yearA < yearB) return -1;
    if (yearA > yearB) return 1;

    if (monthA < monthB) return -1;
    if (monthA > monthB) return 1;

    if (dayA < dayB) return -1;
    if (dayA > dayB) return 1;

    return 0;
}

async function fetchHabitOutcomes(userID: string, habitID: string, year: number, month: number): Promise<HabitOutcome[]> {

    const params = {
        userID: userID,
        habitID: habitID,
        year: year,
        month: month,
    }

    const response = await fetchServer(Method.GET, "/outcomes", params);

    console.log("/outcomes response:", response);

    if (response.status === 404) {
        console.log("unable to find outcomes for habitID:", habitID, "year:", year, "month:", month);
        return [];
    }

    return response.content;

}

class DayOutcome {
    constructor(public year: number, public month: number, public day: number, public outcome: Outcome, public today: number) {}
};

interface CalendarComponentProps {
    userID: string,
    habitID: string,
    setUpdate: React.Dispatch<React.SetStateAction<number>>,
}

const MainDivStyle = styled.div
`
display: flex;
justify-content: center;
font-family: ${FONT_THEME.MAIN_FONT};
background-color: ${COLOR_THEME.SECTION};
color: white;
padding: 20px;
margin: 10px;    
`

const ButtonStyle = styled.button 
`
background-color: ${COLOR_THEME.BUTTON};

&:hover {
    background-color: ${COLOR_THEME.SUBSECTION}
}
`

const BackButtonImgStyle = styled.img
`
width: 20px;
height: 20px;
`

const ForwardButtonImgStyle = styled.img
`
width: 20px;
height: 20px;
-webkit-transform: scaleX(-1);
transform: scaleX(-1);
`

const MonthTextStyle = styled.div
`
margin: 10px;
`

const CalendarComponent: FC<CalendarComponentProps> = ({userID, habitID, setUpdate}) => {

    const dateToday = getDateToday();

    const [displayYear, setDisplayYear] = useState(dateToday.year);
    const [displayMonth, setDisplayMonth] = useState(dateToday.month);

    const goPreviousMonth = () => {
        if (displayMonth === 0) {
            setDisplayMonth(11);
            setDisplayYear(displayYear-1);
        } else {
            setDisplayMonth(displayMonth-1);
        }
    }

    const goNextMonth = () => {
        if (displayMonth === 11) {
            setDisplayMonth(0);
            setDisplayYear(displayYear+1);
        } else {
            setDisplayMonth(displayMonth+1);
        }
    }

    const [calendar, setCalendar] = useState<(DayOutcome | undefined)[][] | undefined>(undefined);

    // updated whenever the user switches the month
    useEffect(() => {

        console.log("Updating calendar");

        let newCalendar = [] as (DayOutcome | undefined)[][];

        const firstDay = getStartWeekday(displayMonth, displayYear);
        const numDaysInMonth = getDaysInMonth(displayMonth, displayYear);

        fetchHabitOutcomes(userID, habitID, displayYear, displayMonth).then((outcomes) => {

            let weekday = 0;
            while (true) {

                let day = weekday - firstDay + 1;
                // day is the month day. weekday % 7 === 0 on sunday

                if (day > numDaysInMonth) break; // reached end of month

                // add week to calendar
                if (weekday % 7 === 0) newCalendar.push([] as (DayOutcome | undefined)[]);

                if (day < 1) { // add blank day
                    newCalendar[newCalendar.length-1].push(undefined);
                } else {
                    // add normal day
                    const today = compareDates(displayYear, displayMonth, day, dateToday.year, dateToday.month, dateToday.day);
                    const outcome = getOutcomeOnDay(outcomes, day);
                    newCalendar[newCalendar.length-1].push(new DayOutcome(displayYear, displayMonth, day, outcome, today));
                }

                weekday += 1;
            }

            setCalendar(newCalendar); // update calendar state to be displayed in UI
        });

        

    }, [displayYear, displayMonth]);

    // not yet loaded
    if (calendar === undefined) return <Loading />;

    return <>
    <MainDivStyle className="rounded">
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-center">
                <ButtonStyle className="btn rounded-circle" onClick={goPreviousMonth}>
                    <BackButtonImgStyle src="/back.png"></BackButtonImgStyle>
                </ButtonStyle>
                <MonthTextStyle className="h4 d-flex justify-content-center">{getMonthString(displayMonth)} {displayYear}</MonthTextStyle>
                <ButtonStyle className="btn rounded-circle" onClick={goNextMonth}>
                    <ForwardButtonImgStyle src="/back.png"></ForwardButtonImgStyle>
                </ButtonStyle> 
            </div>
            <div className="d-flex justify-content-center">
        <table><tbody>
            <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tues</th>
                <th>Wed</th>
                <th>Thurs</th>
                <th>Fri</th>
                <th>Sat</th>
            </tr>
            {
                calendar.map((week, weekIndex) => {
                    return <tr key={weekIndex}>
                        {
                            week.map((day, dayIndex) => {
                                let text = -1;
                                let outcome = Outcome.NONE;
                                let today = -1;
                                if (day !== undefined) {
                                    text = day.day;
                                    outcome = day.outcome;
                                    today = day.today;
                                }

                                return <td key={`${dayIndex}-${displayYear}-${displayMonth}-${day?.day ?? 'empty'}`}>
                                    <CalendarCellComponent
                                    habitID={habitID}
                                    year={displayYear} month={displayMonth} day={text}
                                    outcome={outcome} today={today}
                                    setUpdate={setUpdate} /></td>
                            })
                        }
                    </tr>
                })
            }
        </tbody></table>
        </div>

        </div>
    </MainDivStyle>
        
    </>


}

export default CalendarComponent;