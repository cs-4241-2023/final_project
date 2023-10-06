import { FC, useEffect, useRef, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import { getDateToday } from "../../scripts/date";
import { UserHabit, UserInfo } from "../../../../models";
import HabitListWidget from "./habit-list-widget"

const createHabit = async (navigate: NavigateFunction, setUpdate:  React.Dispatch<React.SetStateAction<number>>) => {
    console.log("create habit");

    const habitName = prompt("Enter habit name:");
    if (habitName === null) return;

    const response = verifyAuth(navigate, await fetchServer(Method.POST, "/createhabit", {name: habitName}));
    console.log(response);

    // refresh
    setUpdate((update) => update + 1);
};

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
                return new UserHabit(habit.name, habit.description, habit.numLoggedDays, habit.percentSuccessWeek, habit.percentSuccessLifetime)
            });
            setUserInfo(new UserInfo(username, numLoggedDays, percentSuccessWeek, percentSuccessLifetime, habitsObj));
        }

        fetchResponse();
    }, [update]);

    if (userInfo === undefined) return <p>Loading...</p>

    setUsername(userInfo.username);
    
    return <>
        <p>Home Page</p>
        <p>Username: {userInfo.username}</p>
        <p>Percent Success This Week: {userInfo.percentSuccessWeek}</p>
        <p>Percent Success Lifetime: {userInfo.percentSuccessLifetime}</p>
        <p>Number of Logged Days: {userInfo.numLoggedDays}</p>
        <p>Habits: {userInfo.habits.toString()}</p>
        
        {
            userInfo.habits.map((habit) => (<p><Link to={"/habit/"+habit.name}>{habit.name}</Link></p>))
        }

        <HabitListWidget/>
        <button onClick ={() => createHabit(navigate, setUpdate)}>Create Habit</button>

    </>
};
  
  export default HomePage;
