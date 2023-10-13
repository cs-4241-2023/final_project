<h1>
   CS4241 Final Project: Lookout
</h1>
Aashi Mehta, Sophia Silkaitis, Emre Sabaz

## Video Link

[Watch our project video here](https://youtu.be/36YBfp1Xlbg)

## Project Link

[Lookout Project](https://lookout-project.glitch.me)

https://lookout-project.glitch.me 
This project is a MERN (MongoDB, Express, React, Node.js) stack web application designed to replicate the functionality of Outlook calendar. 
Users can either log in with their existing credentials or create a new account if they don't already have one. 
User passwords are hashed using the bcrypt library. 
All user-related data, including usernames, hashed passwords, and calendar events, are stored in a MongoDB database.
Users can modify their events by clicking the "Modify" button and then making changes directly from the submission box.
 One of the primary challenges revolved around ensuring that changes made in the frontend were consistently reflected in the backend. This required careful synchronization and communication between the frontend and backend components of the application.

A main difficulty in the front end was implementing the calendar using react-big-calendar import. It's a huge import and the docs for it can be a bit confusing. It was challenging figuring out how to implement it and which each part of it meant. 
After learning, we also had to figure it out and undertand it enough to make our own code to add, modify, and delete that would still update the calendar. It was really helpful for future projects to learn how to take existing structures and learn how to properly understand them to adjust and add to them. 
One specific area where we faced difficulties involved deleting items from the server. We had multiple sources for entry, as well as we all had differences in how we write code. We had to combine and learn each others' coding styles, and that's where a lot of the issues with the deleting from the server came in. We fiddled with ids and obejcts and different remove methods between sending just an id to the server and also an object. We also implemented cookies at one point (which is what caused it to crash when we tried to present in class) but ultimately found the issue after a couple of hours worth of debugging.
With deleting items, our debugger just would not work for this project. Sophia used it a lot in A3 and had experience and so we tried it multiple times and could not access any information in the backend. We had to debug any backend issues with guess and check and also to logically think through all possible issues until we finally got a solution.
Discord OAuth2.0. Given the time frame and the other challenges we faced ensuring that the frontend was making proper requests to the backend, 
we were unable to implement this. 

As of the evening of 10/12, the project was fully functional. However, when the team met to create the assignment recording, the Glitch project had been suspended.
We were able to download the code and reupload it, however, some of the functionalities broke in this process. We troubleshooted them and solved them, to our knowledge. 
We have attached a Glitch screenshot as proof of this issue, but if there are some issues with the project, then it is likely due to having to download and reupload it to Glitch.

What each person was responsible for: 
- Sophia: frontend (calendar.jsx) and troubleshooting
- Emre: frontend (login.jsx) and troubleshooting
- Aashi: backend (server.js) and troubleshooting




