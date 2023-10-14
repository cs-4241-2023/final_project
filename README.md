# DiverTrak

https://divertrak-x6pbg.ondigitalocean.app/

1. We made a High school diving state meet tracker. This tool helps divers/coaches/meet organizers keep track of who qualified, how, and under what conditions (which dives they will be preforming). There is a portal for divers to input their meet data (dive type and scores). Upon selecting a dive number, the dive name and difficulty are displayed based on data from a json file, and net scores are calculatede using this info. There is also a Progress page to view a diver's qualified dive lists for Sectional/State meets. Finally, there is a profile page that contains basic information about the user.
When registering, you will have the option to set your status as either a player or coach, along with year of graduation, the (existing) team you will be registering under, and standard verification of credentials. Once registered, a user can log in with their username and password, which is piped through our backend and validated against records stored in MongoDB.

    Overall, this app showed us the challenge of creating a large scale React app without lots of prior experience. It would have been very helpful to know how to use routing, as this would allow us to use multiple pages. This would have eliminated the need for the extensive conditional rendering we do. In the future, we would explore other frontend frameworks that are not single-page oriented like React, or learn the conventions for how to use React for creating large applications.

2. Site Navigation:
    - Login info:
        - Username: admin
        - Password: admin
    - Once logged in, a user will be have the option to navigate to one of three pages through our menu bar.
        1. Dive Entry: This is our landing page, and contains a form through which dives can be submitted to the database
        2. Progress: Once here, a user can evaluate their progress towards qualifcation for dive meets at varying levels
        3. Profile: This page contains basic biographical information for the user who is currently logged in
    - Note: if a user's submitted dives don't show up on the progress page after submitting, try refreshing the page and checking again. This happens because our DigitalOcean server doesn't have enough computing power to refresh quickly, but when run locally, it works fine.
3. We used:
    - MongoDB for persistent storage
    - Express for our server
    - React for our frontend
        - we used MUI as our frontend library
    - Node.JS for our runtime engine
4. We found it difficult to create separate components and use them in the same JSX files. We could improve our structure by using props to pass data to different components. Additionally, our styling is adaptive to both dark and light mode, but is optimized for light mode viewing. This should be kept in mind when navigating through the application.
5. Contributions
    - Thomas: backend for dive table input, progress, and profile page
    - Sarah: frontend for progress and profile page, overall stylization
    - Mike: frontend and backend for user registration/authentication, database setup
    - David: frontend for dive table input, dive info json, profile editing, documentation
6. https://youtu.be/G3_rNFzCfc4