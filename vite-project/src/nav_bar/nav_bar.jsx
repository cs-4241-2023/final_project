import React from "react"
import {Link} from "react-router-dom"

function Navbar() {
    
    return (    
        <div>
            <div>
                <Link to = "/">Logout</Link>
            </div>
            <div>
                <Link to = "/music_tour_builder">Music Tour Builder</Link>
            </div>
            <div>
                <Link to = "/music_trends_information">Music Trends Information</Link>
            </div>
        </div>
    )
}
   
   export default Navbar