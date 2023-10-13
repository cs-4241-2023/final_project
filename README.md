# Final Project -- Keaton Mangone, Nathan Sadlier

Glich Link: https://cs4241-final-project-keaton-mangone-nathaniel-sadlier.glitch.me/

Youtube Link: https://youtu.be/T5RxfySlCKg

# Description
# ---------------------
For our final project, we created a clicker game for the purpose of entertainment. Our game, named Bitcoin clicker, is based around the user collecting as many bitcoins as possible, using these bitcoins to purchase upgrades and autoclickers to achieve greater amounts of bitcoins more efficiently. To mine bitcoin, you simply need to click on the button, there is a given rate above the bitcoin image (calculated with a base of .02/click and any upgrades you own). There is a count of the amount of bitcoins you currently own under the title of the webpage so you can keep track of how many you have earned. Currently, we have 2 upgrades and 2 autoclickers set up. However, these are procedurally printed out from an array, and more can easily be added to this array by adding entries. Upgrades incease the amount of bitcoin you get with each click of the image, while autoclickers increase the rate at which you passively gain bitcoin.
We Implemented a user credential system so that users can keep their progress saved. Currently, at the bottom of the page there is a login/signup area in which the user can log in with existing credentials or can create an account by inputting credentials that are unused and hitting create account. Having this on the same page as the clicker game allows users to play without needing an account. While logged in, there is a manual save button. However, after every purchase the game automatically saves as well to ensure the user does not lose a ton of progress on accident. If the user wants to delete their account they simply need to type in the username and hit delete to ensure that they do not delete their account on accident.

# Other Info
Already existing account: admin/password , but TA is able to make their own account if wanted. Also, sound on for audio purposes.


# TECHNOLOGIES:

MongoDB: This allowed us to have an external database where we could store saved game data based on user credentials on a database rather than locally in the browser. This reduces the load on the user, and creates persistent data for the user to continuously come back to.

React + Vite: As a clicker game has a lot of moving and changing parts, we knew React was going to be a crucial technology to get our game to work properly. React helped us in realtime updating the amount of bitcoins the user has, handling the update with onclick functions, and even allows us to have our upgrades in an array and be easily updated. Furthermore, vite was necessary for us to be able to build and configure our react project.

Node + Express: We used Node + Express to properly communicate between the game and our MongoDB database. These technologies were crucial in allowing us to have a user credential experience as well as to save the data of the game externally in a database rather than locally on the browser.

CSS: We wanted to place a heavy emphasis on creating a good looking project. Using CSS we were able to make the website look as we pleased, creating good looking 3d-like buttons, and a good color scheme for the game.


# Challenges 
As our team was the last group to form, we faced the challenge of having a further limited timeframe, as well as a limited team size (with there only being 2 of us). With this, we knew we couldn't be outwardly ambitious as we had heavy restraints on us, but were both excited at the thought of creating a clicker game. A clicker game allowed us to create a base game within the alloted time, and left room for us to flesh out the game if we had remaining time for the project after the base game was finished. With this, we focused on user accounts, overall look of the game, and small quality of life updates.

# Responsibilities
Keaton: Responsible for Base Game, UI, react elements

Nathaniel: Responsible for MongoDB, user accounts, login area, and QOL adjustments such as "Owned:" under autoclickers and rates appearing above bitcoin image.
