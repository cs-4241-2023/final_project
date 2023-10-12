import React from "react"
import { Link } from "react-router-dom"
import "bulma/css/bulma.min.css"

function Navbar() {
  return (
    <nav class="navbar is-fixed-top has-background-white-ter" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div>
          <Link class="navbar-item" to="/">
            Logout
          </Link>
        </div>
        <div>
          <Link class="navbar-item" to="/music_tour_builder">
            Build a Fantasy Music Tour
          </Link>
        </div>
        <div>
          <Link class="navbar-item" to="/music_trends_information">
            Music Trends Information
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
