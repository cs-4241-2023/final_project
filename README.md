Fantasy Music Tour Builder - Matthew McAlarney, Adish Jain, Sean Arackal, Sultan Adedeji, Daniel Onyema

Glitch Project: https://webwarefinalproject-matthew-adish-daniel-sultan-sean.glitch.me/

Our group created the Fantasy Music Tour Builder web application. The purpose of the application is to provide users a high-level format for building a potential music tour through the use of a text editor (Fantasy Music Tour Text Editor). The text editor contains 6 main fields that make up a fantasy music tour (musictourname, tourduration, tourcontinent, targetaudienceagerange, headliningartist, directsupportartist). This main functinality of the application provides value for concert promoters, tour managers, and avid music fans as it provides a way for these groups of users to map out the foundation of a new music tour.
In addition to the Fantasy Music Tour Text Editor functionality mentioned above, there is also a Music Trends Information page that lists information painting a picture of the current state of popular music and technology in the music industry. This information consists of new music genres that have been emerging, older genres that are going through a revival, the way technology impacts music production and consumption, and an embedded Youtube video containing the Billboard Hot 100 Top 40 songs of the past week. The Music Trends Information page creates some value for the users through providing relevant information about current music and artists that could influence their decision-making when using the Fantasy Music Tour Text Editor.

Here is some login information, and you can also choose to create a new account as well:

Username | Password

joe      | pw

luke     | pw

matt     | pw

john     | pw

alex     | pw

sean     | pw

Technologies/libraries we used:

vite-express: We used Vite-express to initialize our React project. Vite is a build system that handles static routes for us and converts React components (JSX) into HTML.

React: We used React to create our frontend components, which include a combination of HTML and JavaScript for keeping state and sending/recieving data to and from the server. React allowed us to code the landing_page, music_tour_builder, music_trends_information, nav_bar, user_creation, and user_login components.

React-DOM: Used to create the root for rendering our App in the HTML document.

React-Router-DOM: Used to enable a functional navigation bar in our application and allows us to use the useNavigate React hook in the user_login component.

Node + Express: We used Node and Express to write our main.js server. Our server handles data and feedback creation for user logins and creations, and also handles GET and PUT requests for Fantasy Music Tour Text Editor data stored for each user.

MongoDB: We used MongoDB to set up a database where we dedicate a document to each user. For each user, we store their username, password, and a musicfantasytour object containing key-value pairs for all the data shown in the Fantasy Music Tour Text Editor. All valid data from the text editor goes through our main.js server and persists to the database.

dotenv: We use dotenv to store our environment variables (USER, PASS, HOST) for the application to connect to our MongoDB database.

bcryptjs: We use the hashing capability of bcryptjs in our main.js server to encrypt all passwords created by new users before persisting those passwords to the MongoDB database. Our use of bcryptjs ensures that user passwords are securely stored in the database and the actual passwords are never displayed in plaintext.

cookie-session: Used to set the user login session to true or false depending on whether the user successfully authenticates.

Bulma CSS: We used the Bulma CSS frameowkr to style our entire application.

Challenges we faced in completing the project: The initial challenge we faced during the first week of the project was figuring out how to use and tailor React to the needs of the Fantasy Music Tour Builder. There were a lot of questions that came up about the best way to use state variables in each of our components to locally store user login, user creation, and Fantasy Music Text Editor data on the client-side. As it pertains to the various user input validation measures that we implemented for both user authentication and user input to the text editor, there were a number of small difficulties we had to overcome in getting our components to rerender as desired whenever there was a change in state. We implemented a number of useEffect hooks to help overcome those difficulties and ultimately figured out a reasonable way to tailor React to our project. As a result, we developed a functional application that accounts for user input validation and checking edge cases in user input across the board. As the project neared completion, another challenge we faced was figuring out how to properly deploy our web application to Glitch. None of had successfully deployed a Vite + React project to Glitch before this final project, and so we had to go through a series of DevOps experiments with the help of Akim to resolve the issues we were seeing when trying to host the project on Glitch. We overcame these issues through a bit of work reorganizing the folder structure of our project, creating a production build, and reinitializing our project using npm create vite-express instead of just npm create vite.

Group Project Contributions:

Matthew: Application architecture (including planning out the libraries we would need), user_login and user_creation components, landing_page component, majority of the functionality and HTML in the music_tour_builder component, nav_bar and display_nav_bar components, App component/setup of our React router, all main.js server code, the setup and connection to our MongoDB database, deploying the app to Glitch, helped out with additional content ideas for the music_trends_information component, and helped polish some of the Bulma CSS styling.

Sean: Bulma CSS styling of all components and contributed some ideas for the content displayed on the music_trends_information component.

Adish: Wrote the code for the music_trends_information component and came up with the HTML content that is rendered.

Daniel and Sultan: Paired together to write the code for the user input validation functionality for certain fields in the music_tour_builder component.

Project Video: https://www.youtube.com/watch?v=U4m2qgBnB5A
Note: Sean could not be in our project video as he was away from campus attending to other obligations from 10/12/23-10/13/23. In the video, we explained Sean's contributions to our project.

Overall, our project was challenging because it required us to learn how to use React in a way that would best suite the content that we had planned out early on. We had to spend quite a bit of time reading React documentation to resolve client-side issues and get each of our components rendering as desired. As a result of our approach to these challenges, we believe that we have created a highly functional web application with a consistent file organization, a fantasy music tour data structure that is streamlined and ideal for engaging users, a reasonable scope of user input validation, and a set of interesting and varied HTML layouts for the content on all of our application pages. Additionally, we believe that our application delivers value to the users (tour promoters, tour managers, avid music fans) through providing the foundational data fields and context of the current landscape of music to inform potential music tours (and ones that could be profitable) in the real world. 









