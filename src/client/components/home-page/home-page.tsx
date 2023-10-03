import { FC } from "react";
import { Link } from "react-router-dom";

const profiles = ["Adam", "Bob", "Charlie"]

const HomePage: FC = () => {


    return <>
        <p>Home Page</p>
        
        {
            profiles.map((profile) => (<p><Link to={"/habit/"+profile}>{profile}</Link></p>))
        }
    </>
};
  
  export default HomePage;