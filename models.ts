export enum Outcome {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    NONE = "NONE"
}

export class HabitOutcome {
    year: number = -1;
    month: number = -1;
    day: number = -1;
    outcome: Outcome = Outcome.NONE;

    constructor(year: number, month: number, day: number, outcome: Outcome) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.outcome = outcome;
    }

}

export class UserHabit {
    userID: string;
    habitID: string;
    name: string;
    description: string;
    currentStreak: number;
    numLoggedDays: number;
    numSuccessesWeek: number;
    percentSuccessLifetime: number;
    numLoggedDaysWeek: number;

    constructor(userID: string, habitID: string, name: string = "", description: string = "", currentStreak: number = -1, numLoggedDays: number = -1, numSuccessesWeek: number = -1, percentSuccessLifetime: number = -1, numLoggedDaysWeek: number = -1) {
        this.userID = userID;
        this.habitID = habitID;
        this.name = name;
        this.description = description;
        this.currentStreak = currentStreak;
        this.numLoggedDays = numLoggedDays;
        this.numSuccessesWeek = numSuccessesWeek;
        this.percentSuccessLifetime = percentSuccessLifetime;
        this.numLoggedDaysWeek = numLoggedDaysWeek;
    }

    get percentSuccessWeek(): number {
        return (this.numLoggedDaysWeek === 0) ? 0 : +(((this.numSuccessesWeek / this.numLoggedDaysWeek) * 100).toFixed(2));
    }

}

export class UserInfo {
    username: string;
    numLoggedDays: number;
    percentSuccessWeek: number;
    // percentSuccessLifetime?: number;
    percentSuccessLifetime: number;
    habits: UserHabit[];

    constructor(username: string = "", numLoggedDays: number = -1, percentSuccessWeek: number = -1, percentSuccessLifetime: number = -1, habits: UserHabit[] = []) {
        this.username = username;
        this.numLoggedDays = numLoggedDays;
        this.percentSuccessWeek = percentSuccessWeek;
        this.percentSuccessLifetime = percentSuccessLifetime;
        this.habits = habits;
    }

}

export class Day {
    year: number = -1;
    month: number = -1;
    day: number = -1;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    previous(): Day {
        let date = new Date(this.year, this.month, this.day);
        date.setDate(date.getDate() - 1);
        return new Day(date.getFullYear(), date.getMonth(), date.getDate());
    }

}