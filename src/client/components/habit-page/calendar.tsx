import { useEffect, useState } from "react";
import { getDateToday } from "../../scripts/date";
import { get } from "http";

function getDaysInMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
}

// given a date, return {week, weekday}. both are 0-indexed
function getDayGivenPosition(date: Date) {

}

function CalendarComponent() {

    const dateToday = getDateToday();

    const [displayYear, setDisplayYear] = useState(dateToday.year);
    const [displayMonth, setDisplayMonth] = useState(dateToday.month);

    // updated whenever the user switches the month
    useEffect(() => {

        const numDaysInMonth = getDaysInMonth(displayMonth, displayYear);

    }, [displayYear, displayMonth]);

}

export default CalendarComponent;