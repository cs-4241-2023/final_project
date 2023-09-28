We have 2 ideas, we want to get your feedback on which will be more doable in the timeframe:

1. High school diving state meet tracker 
    - High School Springboard Divers have to meet certain requirements simultaneously to qualify for sectional and state meets. Divers usually accomplish this slowly throughout the season, but keeping track of which dives you have qualified/meets you have qualified for can be difficult. The general rules for qualification are shown below (server will process this)
        1. You need to receive above 180 points for a total score at (at least) 2 meets
        2. You need to qualify your dives individually: at least 2 dives from EACH of the 5 diving categoies (front, back, reverse, inward, twisting)
        3. To qualify a dive you need to receive at least a 5 from every judge 
    - This tool will be used to help divers/coaches/meet organizers keep track of who qualified, how, and under what conditions (which dives they will be preforming).
    - We plan for there to be:
        - A portal for divers to input their meet data (dive list, dive scores, overall scores), and view their qualified dive lists for Sectional/State meets
        -  Potentially coach portal to know who has qualified to what meets and under what conditions
        - Will add ability to register as either diver or coach
    Optional/If we get to it:
    - Ability to upload meet/recruiting videos

    - Tech stack:
        - MERN

2. WAVRunner: A spin-off of the popular platformer game, Geometry Dash, where instead of a player completing pre-generated levels, they can upload an audio file of their choice.
- Based on that audio file, we will use libraries meant for audio metadata extraction to procedurally generate obstacles in a linear course.
    - Tech Stack / Libaries:
        - Stack:
            - React
        - Audio Info Extraction
            - Meyda
            - Essentia
- Size limits would be enforced to ensure the quality of play is maintained, and those limitations would be enforced based on the mode of upload.
    - For audio extracted from a YouTube video link
        - Rely on YouTube's API to check the length against a pre-defined maximum.
    - For locally sourced files
        - Check the metadata of the file for length and compare it against a pre-defined maximum.  
