# Project Description
For our project, we created a multiplayer game called Club Pigeon. Similar to the game Club Penguin, a user can connect to a server where they join a main lobby. In this lobby, they can see other players moving around and interact with the other buildings in the lobby. The first building is a dojo where players can play against each other in a simple card game similar to Rock-Paper-Scissors. After winning some games at the dojo, the player collects coins which they can spend at the shop. A player can purchase different puffles to change their sprite appearance. 

Making Club Pigeon really challenged us to learn about new libraries. Prior to this project, none of the members in our group had used Socket.IO for multiplayer games and Kaboom.js for making the visuals of the game. We had to learn all about Kaboom's scene and user input mechanics to implement the card game and store. For Socket.IO, we had to learn how to perform networked communications while using an Express server.

Our game is hosted on Glitch and can be found using the link below:

https://club-pigeon.glitch.me/

# Running the Project
To run the project, a user can simply use the link above and create a new account. After creating an account the user will be navigated to the lobby where they can begin playing and shopping. 

An account with 2000 coins has already been created and can be used to test shopping features if earning coins through the card game takes too long. (Username of this account is `test`).

# Technologies
- A `Node.js` runtime was used to initialize our project and manage dependencies.
- An `Express` server was used to host our application on a port to allow for multiple client connections.
- `MongoDB` was used to store user data relating to purchased character skins and retain the number of coins a player had earned through their games. The database also helped with initailizng player data when a user logged back into the game.
- `Socket.IO` was used for networked communication where users could see real-time changes/actions made by another user. Socket.IO allowed us to create a player versus player card game and make a lobby where multiple users could see each other.
- `Kaboom.js` was used to render scenes and game sprites on the client-side. Kaboom also helped with registering user input which could be sent to either Socket.IO, MongoDB, or used to change the visuals.

# Challenges
For Kaboom.js, we faced many challenges surrounding the documentation of this library. Since we were all new to this technology, we often consulted online sources to help with development. However, Kaboom's documentation is very limited and vague and did not help us understand how to apply the functions of the library for the goals of this project. Furthermore, best practices surrounding Kaboom's functions were also very vague, and we were unsure if we were developing our project efficiently and effectively. We also faced some challenges getting the JavaScript modules working.

# Responsibilites
Andrew: Created the login and sign up page, set up the basic scene layout for the lobby and dojo, QoE changes like highlight behavior for interactable objects and setting up rules display for card game

Bright: Programmed the actual card game which includes getting a hand to play and the winning and losing system for the game. Bright also created most of the art and sprites for the game.

Nelson: Worked on the networking for any multiplayer interactions using socekt.io. This included the movement of remote players, playing cards in the card game, and changing sprites on other player's screens.

Nathan: Worked on the puffle store and MongoDB connection. Nathan was responsible for building endpoints that sent and retrieved data from the database. He also designed the user interface for the puffle store and created the code that initialized user data into the puffle store.

# Project Video
https://youtu.be/JWGFK8vbNx4