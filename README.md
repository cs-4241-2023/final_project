# Final Project
Click Cash

By Matt McGourty

Glitch link: https://finalproject-cs4241.glitch.me/

## Project ideation
This project is meant to serve people who like gaming, particularly clicker games, in having fun and being able to play a new game. 

## Project Info

1. The game I created is called Click Cash. There is a start screen that tells users to click play. Once users click play, they can click the dollar sign image to earn more in game money. This money can be spent on four different upgrades that cost a various amount, and the cost of each increases as users buy more of the same upgrade. The four upgrades are add autoclicker (gives user +$1 per second automatically), increase per click (extra $1 per click), add business (gives user +$25 per second automatically), and add megaclick (extra $25 per click). The game tracks and displays the user amount of money, money earned per second, and money earned per click. There is also a help page for users who are confused on how the game works or what each upgrade does. 

2. No additional instructions should be needed. 

3. Technologies Used:
Bootstrap -> I used Bootstrap 5 to style parts of the game and also to make the web page responsive, so it looks good and functions on different screen sizes. 
Express JS -> I used Express to handle get requests when switching between screens in game.

4. Challenges
In completing this project, I faced various challenges.

One challenge was having the game data and front end information update every second based on autoclickers. I was able to do this by creating a JS time with a set interval of 1000, and doing money = money + numAuto (number of money earned auto a second), and then updating the inner HTML of moneyAmount. I also made this function only work when the help page is not open, so the game basically pauses when the user is reading help, and made the button flash different colors so it looks like it is actually being clicked.

Another challenge I had was getting the values of upgrade costs from innerHTML in order to track previous value before increasing. This was difficult, because I just wanted to get the actual integer value of the price not the "$" or any info after, and the number of digits in the values could potentially change. I was able to solve this by going into the inner HTML and getting a substring that starts at 1 (removes $) and ends at samplePrice.toString().length+1.

6. I was responsible for all work shown in this project.

7. Youtube Link: https://www.youtube.com/watch?v=WRR4t-gjm0Q&ab_channel=MattMcGourty
