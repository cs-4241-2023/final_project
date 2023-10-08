export function getDateToday(): {year: number, month: number, day: number} {
    const date = new Date();
    return {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()};
}
