Team members: Matthew McAlarney, Sean Arackal, Daniel Onyema, Sultan Adedeji, Adish Jain

Project Proposal: Fantasy Music Tour Builder

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Important! Here is our original proposal for the main functionality of the application:

We would like to create a web application that allows users to construct their own fantasy music tour using any number of artists and musicians they would like. A fantasy music tour consists of the following components that the user must enter information for in this order: 1. Tour Name - Daniel 2. Tour Duration - Adish a. A tour duration is the total number of days the tour will take. 3. List of tour locations and dates - Matthew a. For each tour location, there is some important information: I. Country II. State or division III. Venue name IIII. Date of touring the location: Month, Day, Year 4. List of target audiences: - Sean a. For each target audience, there are certain characteristics: I. The expected age range of the target audience II. The expected favorite music genres of the target audience 5. List of headlining artists: - Sultan a. For each headlining artist, there is a setlist: I. For each song in a setlist, just report the song name. 6. List of supporting artists: - Matthew a. For each supporting artist, there is a setlist: I. For each song in a setlist, just report the song name.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

For the sake of time at the end of the term and coordinating the project work between the five of us, we decided to narrow the scope of our project proposal before beginning the project. In our final application, a fantasy music tour is actually just made up of the following fields:

1. Tour Name

2. Tour Duration

3. Tour Continent

4. Target Audience Age Range

5. Headlining Artist

6. Direct Supporting Artist

This web application will have a login/creation system and user authentication, which will allow every user to construct their own fantasy music tour. Each user can only construct one tour, but field modification controls will be exposed to each user to allow them to update their one tour. All data will be persisted to a MongoDB database so that users can access saved tour information between server sessions. In addition to the main functionality of building a fantasy music tour, there will also be navigation via a navbar to a music trends information page containing sections of information and video content about the current landscape of music and the influence of technology on the music industry.

Users and stakeholders:

Avid music fans, tour promoters, and tour managers will find our web application useful for generating ideas for different music tours. Music fans can use our web application to come up with stacked tour lineups and share them with friends, and tour promoters/managers can use our application to come up with the foundational ideas for a tour.

Primary technologies/frameworks we plan on using:

React, Node, Express, MongoDB, Bulma CSS