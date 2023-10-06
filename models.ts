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
    idStr: string;
    name: string;
    description: string;
    currentStreak: number;
    numLoggedDays: number;
    percentSuccessWeek: number;
    percentSuccessLifetime: number;
    outcomes: HabitOutcome[];

    constructor(idStr: string, name: string = "", description: string = "", currentStreak: number = -1, numLoggedDays: number = -1, percentSuccessWeek: number = -1, percentSuccessLifetime: number = -1, outcomes: HabitOutcome[] = []) {
        this.idStr = idStr;
        this.name = name;
        this.description = description;
        this.currentStreak = currentStreak;
        this.numLoggedDays = numLoggedDays;
        this.percentSuccessWeek = percentSuccessWeek;
        this.percentSuccessLifetime = percentSuccessLifetime;
        this.outcomes = outcomes;
    }

}

export class UserInfo {
    username: string;
    numLoggedDays: number;
    percentSuccessWeek: number;
    percentSuccessLifetime?: number;
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
}