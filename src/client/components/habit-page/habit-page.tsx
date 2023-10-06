import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import HabitNavComponent from "./habit-nav";


const HabitPage: FC = () => {
    const { habitID } = useParams();

    // poll for server

    console.log("Habit Page", habitID);

    return <>
    <HabitNavComponent/>
    <p>Habit Page for: {habitID}</p>
    <Link to="/home">Home</Link>
    </>
}
    
  
  export default HabitPage;