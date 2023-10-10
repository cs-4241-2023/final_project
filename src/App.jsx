import React from "react"
import LandingPage from './landing_page/landing_page.jsx'
import NavBar from './nav_bar/nav_bar.jsx'
import DisplayNavBar from './nav_bar/display_nav_bar.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' //Router provides a roter for use in web broswers and provides clean URL paths.
import MusicTourBuilder from './music_tour_builder/music_tour_builder.jsx'
import MusicTrendsInformation from './music_trends_information/music_trends_information.jsx'

//JSX converts HTML into React elements
//Files grouped by feature

function App() {

  return (
    <>
      <Router> 
          <DisplayNavBar>
            <NavBar /> 
          </DisplayNavBar> 
          <Routes> 
            <Route path = '/' element = {<LandingPage/>} /> 
            <Route path = '/music_tour_builder' element = {<MusicTourBuilder/>} /> 
            <Route path = '/music_trends_information' element = {<MusicTrendsInformation/>} /> 
          </Routes> 
      </Router>
      <footer>
        <div>
          Fantasy Music Tour Builder created by Matthew McAlarney, Sean Arackal, Adish Jain, Daniel Onyema, and Sultan Adedeji
        </div>
      </footer>
  </>
  )
}

export default App
