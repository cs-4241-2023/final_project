import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Method, fetchServer, verifyAuth } from "../../scripts/fetch-server";
import { getDateToday } from "../../scripts/date";

const habits = ["Habit 1", "Habit 2", "Habit 3"]

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

    console.log(response);
    
    return <>
        <p>Home Page</p>
        
        {
            habits.map((habit) => (<p><Link to={"/habit/"+habit}>{habit}</Link></p>))
        }
    </>
};
  
  export default HomePage;
