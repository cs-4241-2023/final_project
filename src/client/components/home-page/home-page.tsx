import { FC, useEffect, useRef, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import { getDateToday } from "../../scripts/date";
import { UserHabit, UserInfo } from "../../../../models";
import { Loading } from "../css-components/loading";
import PercentIcon from "../shared-components/percent-icon";
import HabitListWidget from "./habit-list-widget"
import HabitWidget from "./habit-widget";



interface HomePageProps {
    setUsername: (username: string) => void;
};

const HomePage: FC<HomePageProps> = ({ setUsername }) => {

    const navigate = useNavigate();

    const [update, setUpdate] = useState(0); // used to ask server for new data 

    console.log("Home Page");


    const {year, month, day} = getDateToday();
    const params = {
        userID: undefined,
        currentYear: year,
         currentMonth: month,
         currentDay: day,
    }

    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

    useEffect(() => {

        const fetchResponse = async () => {
            const response = verifyAuth(navigate, await fetchServer(Method.GET, "/userinfo", params));
            console.log(response);

            const {username, percentSuccessWeek, percentSuccessLifetime, numLoggedDays, habits} = response.content;
            const habitsObj = (habits as any[]).map((habit) => {
                return new UserHabit(habit.userID, habit.habitID, habit.name, habit.description, habit.currentStreak, habit.numLoggedDays, habit.numSuccessesWeek, habit.percentSuccessLifetime, habit.numLoggedDaysWeek)
            });
            setUserInfo(new UserInfo(username, numLoggedDays, percentSuccessWeek, percentSuccessLifetime, habitsObj));
        }

        fetchResponse();
    }, [update]);

    if (userInfo === undefined) return <Loading />

    setUsername(userInfo.username);
    
    return <>
        <PercentIcon percent={0.75} />
        <p>Home Page</p>
        <p>Username: {userInfo.username}</p>
        <p>Percent Success This Week: {userInfo.percentSuccessWeek}</p>
        <p>Percent Success Lifetime: {userInfo.percentSuccessLifetime}</p>
        <p>Number of Logged Days: {userInfo.numLoggedDays}</p>
        <p>Habits: {userInfo.habits.toString()}</p>
{/*         
        {
            userInfo.habits.map((habit) => (<>
            <p><Link to={"/habit/"+habit.habitID}>{habit.name} {habit.habitID}</Link></p>
            <ul>
            <li>Streak: {habit.currentStreak}</li>
            <li>Number of Logged Days: {habit.numLoggedDays}</li>
            <li>Percent Success Week: {habit.percentSuccessWeek}</li>
            <li>Percent Success Lifetime: {habit.percentSuccessLifetime}</li>
            </ul>
            </>))
        } */}

        <HabitListWidget setUpdate={setUpdate} habits={userInfo.habits}/>


        {/* {

            userInfo.habits.map((habit) => (<>
                <HabitWidget userHabit={habit} />
                <HabitListWidget setUpdate={setUpdate} userHabit={habit}/>

             </>))
        } */}



            
    
        

    </>
};
  
  export default HomePage;
