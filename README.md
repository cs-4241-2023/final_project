This project intended to be a multiplayer experience for 2-5 people. Unfortunately the project did not have complete the multiplayer component in time, and has been set back to a preciously working demo.
What this project did achieve is creating a working, dynamic ui with 3d physics simulation of dice rolls. There is robust backend for a central server.
Though we did not submit an initial proposal, we achieved a working UI that properly constrains the player from making an illegal bid, allow the player to see the dice roll before them as well as the result, and see the previous bet and challenge it, though this funcitonality was not fully implemented.
The project can be viewed here: https://final-project-liars-dice.glitch.me/
A video of the demo can be viewed here: https://drive.google.com/file/d/1EvzBeSZoHzvDTQfBLhguwAA7be-Eqm3p/view?usp=drive_link
The working repo can be found here: https://github.com/IainMcE/cs4241-final

Contributions:
Iain: Dice rolling, making use of three.js for visuals and cannon-es for the physics, Attempted work on multiplayer functionality
Niralya: Worked on the server using node and express and created the API calls for (init, join, roundWinner, challengeRound, Status, rollDice, makeBid, and summary), confirming that they worked using postman
Josh: 
Engjell: Worked on the styling, and front end portion of the website (besides the 3D script) i did the home and instructions page

challenges: express postings not properly getting strings passed through the body was the main crux preventing the implentation of the central server and multiplayer. Without that, there was no updating the states of the game and the player cilents could not be notified to begin rolling dice.
