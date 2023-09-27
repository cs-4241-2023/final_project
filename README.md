# Project: Spelling Goat

## Team members: Tim Connors, Randy Dyer, Mahir Sowad

Spelling Goat is inspired by the New York Times word game [Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee), in which users create words from a combination of seven letters in a honeycomb-shaped hex grid, having to use the center letter in every word. Spelling Bee ends after the user has attained a certain amount of points, with a 4-letter word being worth one point and any words 5 or more letters in length being worth one point for each letter in the word. A pangram is when the player uses all of the letters on the board, which adds an additional 7 points to the score.

In our version, the user will still get points in a similar fashion as in Spelling Bee, but the game will only end once they give up. For each puzzle, there will be a leaderboard of the highest scores, and the user will be able to see how they compared to others who have completed the puzzle. As a stretch goal, we could also determine the score by the rarity of the letters in the word or by the rarity of the word itself.

We plan on using an English dictionary API to check whether or not the user has inputted a valid English word. In order to generate the letters in the puzzle, we will choose a seven-letter word with at least two vowels, no duplicate letters, and a minimal amount of rare letters (x, z, etc.). This ensures that there will be at least one valid word for every puzzle and ideally allows for many other words to be built from the letters.

We will use React as our main frontend framework as well as the Canvas API in order to implement various animations. We will use a Node.js / Express backend with a MongoDB database as needed to store gameplay, leaderboard, and user account information.

Key technologies and libraries:

Vite
React
Canvas API
Node
Express
MongoDB
[WordsAPI](https://www.wordsapi.com/)
[NaturalNode](https://github.com/NaturalNode/natural)
[wordnet-db](https://github.com/moos/wordnet-db)
