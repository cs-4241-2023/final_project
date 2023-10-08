import { FC, useEffect, useState } from "react";
import { getDateToday } from "../../scripts/date";
import { get } from "http";
import { HabitOutcome, Outcome } from "../../../../models";
import { Loading } from "../css-components/loading";
import CalendarCellComponent from "./calendar-cell";
import { Method, fetchServer } from "../../scripts/fetch-server";

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
    constructor(public year: number, public month: number, public day: number, public outcome: Outcome, public isToday: boolean) {}
};

interface CalendarComponentProps {
    userID: string,
    habitID: string,
    setUpdate: React.Dispatch<React.SetStateAction<number>>,
}

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

        // TODO: FETCH OUTCOMES FROM SERVER
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
                    const isToday = day === dateToday.day && displayMonth === dateToday.month && displayYear === dateToday.year;
                    const outcome = getOutcomeOnDay(outcomes, day);
                    newCalendar[newCalendar.length-1].push(new DayOutcome(displayYear, displayMonth, day, outcome, isToday));
                }

                weekday += 1;
            }

            setCalendar(newCalendar); // update calendar state to be displayed in UI
        });

        

    }, [displayYear, displayMonth]);

    // not yet loaded
    if (calendar === undefined) return <Loading />;

    return <>
        <p>Current Year: {displayYear}</p>
        <p>Current Month: {getMonthString(displayMonth)}</p>
        <button onClick={goPreviousMonth}>Previous Month</button>
        <button onClick={goNextMonth}>Next Month</button>
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
                calendar.map((week) => {
                    return <tr>
                        {
                            week.map((day) => {
                                let text = -1;
                                let outcome = Outcome.NONE;
                                let isToday = false;
                                if (day !== undefined) {
                                    text = day.day;
                                    outcome = day.outcome;
                                    isToday = day.isToday;
                                }

                                return <td><CalendarCellComponent
                                    habitID={habitID}
                                    year={displayYear} month={displayMonth} day={text}
                                    outcome={outcome} isToday={isToday}
                                    setUpdate={setUpdate} /></td>
                            })
                        }
                    </tr>
                })
            }
        </tbody></table>
    </>


}

export default CalendarComponent;