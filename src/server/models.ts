export class HabitOutcome {
    year: number = -1;
    month: number = -1;
    day: number = -1;
    isSuccess: boolean = false;
}

export class UserHabit {
    name: string = "[Error]";
    description: string = "[Error]";
    numLoggedDays: number = -1;
    percentSuccessWeek: number = -1;
    percentSuccessLifetime: number = -1;
    outcomes: HabitOutcome[] = [];
}

export class UserInfo {
    username: string = "[Error]";
    numLoggedDays: number = -1;
    percentSuccessWeek: number = -1;
    percentSuccessLifetime?: number = -1;
    habits: UserHabit[] = [];
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