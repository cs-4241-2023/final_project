import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDateToday } from "../../scripts/date";
import { HabitOutcome, Outcome, UserHabit } from "../../../../models";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import { Loading } from "../css-components/loading";


const HabitPage: FC = () => {
    const {habitID} = useParams();

    const navigate = useNavigate();

    const [update, setUpdate] = useState(0); // used to ask server for new data 

    console.log("Habit Page", habitID);

    const {year, month, day} = getDateToday();
    const params = {
        userID: undefined,
        habitID: habitID,
        currentYear: year,
         currentMonth: month,
         currentDay: day,
    }

    const [userHabitInfo, setUserHabitInfo] = useState<UserHabit | undefined>(undefined);

    useEffect(() => {

        const fetchResponse = async () => {
            const response = verifyAuth(navigate, await fetchServer(Method.GET, "/userhabit", params));
            console.log(response);

            // habit not found. redirect to home page
            if (response.status === 404) {
                navigate("/home");
                return;
            }

            const {idStr, name, description, currentStreak, numLoggedDays, percentSuccessWeek, percentSuccessLifetime, outcomes} = response.content;
            const outcomesObj = (outcomes as any[]).map((outcome) => {
                const outcomeEnum = outcome.isSuccess ? Outcome.SUCCESS : Outcome.FAIL;
                return new HabitOutcome(outcome.year, outcome.month, outcome.day, outcomeEnum);
            });
            setUserHabitInfo(new UserHabit(idStr, name, description, currentStreak, numLoggedDays, percentSuccessWeek, percentSuccessLifetime, outcomesObj));
        }

        fetchResponse();
    }, [update]);

    if (userHabitInfo === undefined) return <Loading />

    return <>
    <p>Habit Page for: {habitID}</p>
    <Link to="/home">Home</Link>

    <p>Habit Name: {userHabitInfo.name}</p>
    <p>Description: {userHabitInfo.description}</p>
    <p>Current Streak: {userHabitInfo.currentStreak}</p>
    <p>Number of Logged Days: {userHabitInfo.numLoggedDays}</p>
    <p>Percent Success Week: {userHabitInfo.percentSuccessWeek}</p>
    <p>Percent Success Lifetime: {userHabitInfo.percentSuccessLifetime}</p>
    <p>Outcomes: {userHabitInfo.outcomes.toString()}</p>

    </>
}
    
  
  export default HabitPage;