import { FC } from "react";
import { Link, useParams } from "react-router-dom";


const HabitPage: FC = () => {

    const { habitID } = useParams();

    return <>
    <p>Habit Page for: {habitID}</p>
    <Link to="/home">Home</Link>
    </>
}
    
  
  export default HabitPage;