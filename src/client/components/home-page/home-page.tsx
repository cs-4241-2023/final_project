import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import { getDateToday } from "../../scripts/date";

const testHabits = ["Habit 1", "Habit 2", "Habit 3"]

interface HomePageProps {
    setUsername: (username: string) => void;
};

const HomePage: FC<HomePageProps> = ({ setUsername }) => {

    const navigate = useNavigate();

    console.log("Home Page");

    const {year, month, day} = getDateToday();
    const params = {
        userID: undefined,
        currentYear: year,
         currentMonth: month,
         currentDay: day,
    }
    console.log("send", params);

    const [response, setResponse] = useState<any>(null);

    useEffect(() => {

        const fetchResponse = async () => {
            setResponse(verifyAuth(navigate, await fetchServer(Method.GET, "/userinfo", params)));
        }

        fetchResponse();
    }, []);

    if (response === null) return <p>Loading...</p>
    const {username, percentSuccessWeek, percentSuccessLifetime, numLoggedDays, habits} = response.content;

    setUsername(username);
    
    return <>
        <p>Home Page</p>
        <p>Username: {username}</p>
        <p>Percent Success This Week: {percentSuccessWeek}</p>
        <p>Percent Success Lifetime: {percentSuccessLifetime}</p>
        <p>Number of Logged Days: {numLoggedDays}</p>
        <p>Habits: {habits.toString()}</p>
        
        {
            testHabits.map((habit) => (<p><Link to={"/habit/"+habit}>{habit}</Link></p>))
        }
    </>
};
  
  export default HomePage;
