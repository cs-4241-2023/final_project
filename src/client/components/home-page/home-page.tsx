import { FC } from "react";
import { Link } from "react-router-dom";

const habits = ["Habit 1", "Habit 2", "Habit 3"]

const HomePage: FC = () => {


    return <>
        <p>Home Page</p>
        
        {
            habits.map((habit) => (<p><Link to={"/habit/"+habit}>{habit}</Link></p>))
        }
    </>
};
  
  export default HomePage;