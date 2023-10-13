# Project: Spelling Goat

### Team members: Tim Connors, Randy Dyer, Mahir Sowad

## Project Description

[Project link](https://spelling-goat.glitch.me/)

Our project is inspired by the New York Times word game [Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee). In Spelling Goat, users make words from a puzzle consisting of a hex grid of 7 letters. They get scores for inputting words that consist of the letters in the grid, with a bonus for rarer words and for using all the words in the grid. You can repeat words, and each word must be between 4 and 10 letters.

Once the user is satisfied with their score, they can submit their final score, at which point it will be submitted to the database. If it is the highest score they have submitted for the puzzle, it will appear on the leaderboard below the game grid. There are ten different puzzles that users can play.

## Additional Instructions

In order to access the game, you must first create a user and log in. Click the “Sign up” link on the login page, and create a username and password. Then, type in the username and password on the login page. You can click on the “Directions” button in the top left corner once you log in to get a detailed overview of how the game works. You can change between puzzles using the “Select a Puzzle” button in the top left of the screen and can logout using the “Logout” button as well.

## Technologies

Here are the technologies we used in our app and how:
- React: We used React as the main library for our frontend development. It helped us build a responsive and maintainable web application, especially when used alongside Vite and - Vite-express.
- Node: We used Node as the runtime environment for our server.
- Express: We used Express to handle routing on the backend of our application. Express was especially useful for authentication, since we could use authentication middleware with our routes to ensure that only authorized users can access particular routes and the corresponding data.
- WordsAPI: We used WordsAPI to validate whether or not a guess that the client submitted to the server was actually a real word. WordsAPI also supplied us with the commonality of the given word, which we then used to award more points for rarer words.
- React hex grid library(https://github.com/Hellenic/react-hexgrid): React components to build interactive hexagon grids. This library uses SVG and allows you to create fully customizable and scalable interactive hexagon grids with a simple api.
- JSON Web Tokens (JWT): This was the primary node library used to encrypt the user login/authentication details and store the information as a cookie on the client. This allows the client access to restricted routes, which would be prohibited without the authentication cookie. This also allowed us to query for user-specific information from the backend server in an efficient manner by always including the cookie to any request that was being sent from the client.
- react-router-dom: npm package to handle frontend routing in React
- react-cookie: npm package that was used to parse the authentication cookie on the frontend. 
- Vite: We used Vite in order to initialize the React project.
- Vite-express: We used this library in order to serve both the frontend React app and handle backend requests for different data from the express server from the same server and port. 
- MongoDB: We used MongoDB to store our account data for users as well as the user scores for particular puzzles.

## Challenges we Faced

### Validating Words and Generating Word Scores
In order to check whether a particular word that the user guessed was a valid word, we used an API that contained valid English words. We made requests to the API asking for data about a particular word, and it would set a success flag to false if the requested word was not in its database. WordsAPI also allowed us to get the commonality of a particular word, which we then used to assign each word a rarity score. This helped us make our game unique and a bit more nuanced when compared with Spelling Bee, which simply uses the length of a word to assign it a score.

### Protecting Leaderboard and Score Data
Since our app allows users to submit their scores and displays their high scores in a public leaderboard, we wanted to ensure that the client could only send the currently signed-in user’s scores to the server. Otherwise, users could submit scores for other users, compromising the integrity of the data. To combat this, we used authentication middleware and cookies to allow the server to access the user data of the client and only submit scores to the database under the current user’s username.

### Setting Up Third-Party Hosting
For some reason, our Vite-express scaffolded application was very difficult to host on sites such as Glitch and StackBlitz. We ran into a lot of issues regarding the specific Node version that was running within the virtual Linux machine or web container of the hosting provider. But with some modifications to the package.json file and changing some of our import statements to abide by strict usage of the '.js' extension, we were able to get the application running on Glitch. However, a strange problem still lingers where the first time that the server is booted up (after inactivity on Glitch), there is a 503 error, which is simply bypassed by refreshing the page upon which the app should function as expected.

### Game board design
For our project, we wanted to come up with a game board design that would be unique to our game. Our first instinct was to have the board styled with some sort of goat theme. This proved to be trickier than we first anticipated. When displaying the letters in a grid-like pattern, we found that it may be too easy to guess certain words. If the letters were displayed in a grid-like fashion and the code did not scramble the words effectively, it had the possibility to ‘spell out’ words. In order to get around this issue, we followed the same game board format as Spelling Bee. We found that the hex grid fashion worked best for resolving this issue.

## Group Member Work Breakdown
- Tim: Worked on server-side routing and communication with the client for the puzzle data, validating words using WordsAPI, computing the score for a given word, and styling the sign-in and login pages.
- Randy: Worked on the UI for the gameboard. Worked on the game logic for the frontend. Used the hexgrid library to create the game board. Integrated some backend routing with the frontend code. 
- Mahir: Worked primarily on the signup / login route handling on the backend, adding new users, authenticating credentials using the database, and sending the encrypted cookie containing relevant identifying info to the client, protecting restricted routes, and some debugging. 

## [Link to Project Video](https://youtu.be/eo0zA9iNv8Y)