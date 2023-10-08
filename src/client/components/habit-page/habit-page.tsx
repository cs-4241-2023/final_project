import HabitNavComponent from "./habit-nav";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDateToday } from "../../scripts/date";
import { HabitOutcome, Outcome, UserHabit } from "../../../../models";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import { Loading } from "../css-components/loading";
import HabitInfoComponent from "./habit-info";
import CalendarComponent from "./calendar";
import UserWidgetComponent from "./user-widgets";


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

            const {userID, habitID, name, description, currentStreak, numLoggedDays, percentSuccessWeek, percentSuccessLifetime} = response.content;
            setUserHabitInfo(new UserHabit(userID, habitID, name, description, currentStreak, numLoggedDays, percentSuccessWeek, percentSuccessLifetime));
        }

        fetchResponse();
    }, [update]);

    if (userHabitInfo === undefined) return <Loading />

    return <>
    <HabitNavComponent/>
    <HabitInfoComponent habitInfo = {userHabitInfo}/>
    
    <p>Habit Page for: {habitID}</p>
    <Link to="/home">Home</Link>

    <p>Habit Name: {userHabitInfo.name}</p>
    <p>Description: {userHabitInfo.description}</p>
    <p>Current Streak: {userHabitInfo.currentStreak}</p>
    <p>Number of Logged Days: {userHabitInfo.numLoggedDays}</p>
    <p>Percent Success Week: {userHabitInfo.percentSuccessWeek}</p>
    <p>Percent Success Lifetime: {userHabitInfo.percentSuccessLifetime}</p>

    <CalendarComponent userID={userHabitInfo.userID} habitID={habitID!} setUpdate={setUpdate} />

    </>
}
    
  
  export default HabitPage;