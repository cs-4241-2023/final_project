We have 2 ideas, we want to get your feedback on which will be more doable in the timeframe:

1. High school diving state meet tracker 
    - for high school springboard drivers there are certain requirements that need to be made simultaneously to qualify for sectional and state meets (server will process this)
        1. you need to get a certain overall score
        2. get a certain score for certain dives
        3. qualify a certain number&type of those dives.
    - there will be a portal for divers to input their meet data
    - also potentially coach portal to know who has qualified to what meets and under what conditions
        - will add ability to register as either diver or coach
    - Tech stack:
        - MERN

2. WAVRunner: A spin-off of the popular platformer game, Geometry Dash, where instead of a player completing pre-generated levels, they can upload an audio file of their choice. Based on that audio file, we will use libraries meant for audio metadata extraction to procedurally generate obstacles in a linear course. Size limits would be enforced to ensure the quality of play is maintained, and those limitations would be enforced based on the mode of upload. For audio extracted from a YouTube video link, we would rely on YouTube's API to check the length against a pre-defined maximum. Similarly, for locally sourced files, we would theoretically check the metadata of the file for length and compare it against the aforementioned predefined maximum.  
