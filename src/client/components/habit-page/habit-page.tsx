import { FC } from "react";
import { Link, useParams } from "react-router-dom";


const HabitPage: FC = () => {

    const { profile } = useParams();

    return <>
    <p>Habit Page for: {profile}</p>
    <Link to="/">Home</Link>
    </>
}
    
  
  export default HabitPage;