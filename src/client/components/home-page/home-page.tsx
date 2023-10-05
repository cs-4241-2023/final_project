import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Method, fetchServerAuth } from "../../scripts/fetch-server";

const habits = ["Habit 1", "Habit 2", "Habit 3"]

const HomePage: FC = () => {

    const navigate = useNavigate();

    console.log("Home Page");
    const params = {};
    const response = fetchServerAuth(navigate, Method.GET, "/userinfo", params);

    

    return <>
        <p>Home Page</p>
        
        {
            habits.map((habit) => (<p><Link to={"/habit/"+habit}>{habit}</Link></p>))
        }
    </>
};
  
  export default HomePage;