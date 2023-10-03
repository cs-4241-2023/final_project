export class HabitOutcome {
    year?: number;
    month?: number;
    day?: number;
    isSuccess?: boolean;
}

export class UserHabit {
    name?: string;
    description?: string;
    numLoggedDays?: number;
    percentSuccessWeek?: number;
    percentSuccessLifetime?: number;
    outcomes?: HabitOutcome[];
}

export class UserInfo {
    username?: string;
    numLoggedDays?: number;
    percentSuccessWeek?: number;
    percentSuccessLifetime?: number;
    habits?: UserHabit[];
}