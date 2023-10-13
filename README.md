# Final Project
*Due October 13th (final day of the term)*

For your final project, you'll implement a web application that exhibits understanding of the course materials. 
This project should provide an opportunity to both be creative and to pursue individual research and learning goals.

## General description
Your project should consist of a complete Web application, exhibiting facets of the three main sections of the course material:

- Static web page content and design. You should have a project that is accessible, easily navigable, and features significant content.
- Dynamic behavior implemented with JavaScript (TypeScript is also allowed if your group wants to explore it).
- Server-side programming *using Node.js*. Typically this will take the form of some sort of persistent data (database), authentication, and possibly server-side computation. 
- A video (less than five minutes) where each group member explains some aspect of the project. An easy way to produce this video is for you all the groups members to join a Zoom call that is recorded; each member can share their screen when they discuss the project or one member can "drive" the interface while other members narrate (this second option will probably work better.) The video should be posted on YouTube or some other accessible video hosting service. Make sure your video is less than five minutes, but long enough to successfully  explain your project and show it in action. There is no minimum video length.

## Project ideation
Excellent projects typically serve someone/some group; for this assignment you need to define your users and stakeholders. I encourage you to identify projects that will have impact, either artistically, politically, or in terms of productivity. 

### Deliverables

#### Form Team (due 9/25)
Students are will work in teams of 3-5 students for the project; teams of two can be approved with the permission of the instructor. Working in teams should help enable you to build a good project in a limited amount of time.  Use the `#project-logistics` channel in Discord to pitch ideas for final projects and/or find fellow team members as needed.

Teams must be in place by end of day on Sunday, September 25th. If you have not identified a team at this point, you will be assigned a team. You will be given some class time on Monday to work on your proposal, but please plan on reserving additional time outside of class as needed.

#### Proposal (due 9/27) 
Provide an outline of your project direction and the names of associated team members. 
The outline should have enough detail so that staff can determine if it meets the minimum expectations, or if it goes too far to be reasonable by the deadline. Please include a general description of a project, and list of key technologies/libraries you plan on using (e.g. React, Three.js, Svelte, TypeScript etc.). Two to four paragraps should provide enough level of detail. Name the file proposal.md and submit a pull request by Tuesday, September 27th at 11:59 PM (end of day). Only one pull request is required per team.

There are no other scheduled checkpoints for your project. 

#### Turning in Your Project
Submit a second PR on the final project repo to turn in your app and code. Again, only one pull request per team.

Deploy your app, in the form of a webpage, to Glitch/Heroku/Digital Ocean or some other service; it is critical that the application functions correctly wherever you post it.

The README for your second pull request doesn’t need to be a formal report, but it should contain:

1. A brief description of what you created, and a link to the project itself (two paragraphs of text)
2. Any additional instructions that might be needed to fully use your project (login information etc.)
3. An outline of the technologies you used and how you used them.
4. What challenges you faced in completing the project.
5. What each group member was responsible for designing / developing.
6. A link to your project video.

Think of 1,3, and 4 in particular in a similar vein to the design / tech achievements for A1—A4… make a case for why what you did was challenging and why your implementation deserves a grade of 100%.

## FAQs

- **Can I use XYZ framework?** You can use any web-based frameworks or tools available, but for your server programming you need to use Node.js. Your client-side scripting language should be either JavaScript or TypeScript.

Project: WhatsTheDeal
Contributors: Ethan Catania, Nandita Kumar, Tucker Raymond

1. What we created: Our group created an application which can be used to view current deals for restaurants close to them. On the login page, users can either create a new user and submit it to the database containing users, or input correct credentials and login to the deal page of the application. The deal page contains a list of "deal" components which are rendered based on the contents of the database containing the deal information, as well as a "delete" button to remove the deal from the page and the database. To add a deal to the database, the user must click on the div containing the "Add Deal" text and the plus sign image to make a popup form appear for users to input and submit data.

The calendar page is a place where users can eaisily visualize the deals that are contained within the database. When the calendar page is rendered, it queries the database for any entries contained within the Mongo collection containing deals, and places each deal on the calendar based on the state date of the deal. when an entry in the calendar is clicked on, a popup appears on the screen, displaying the information about the selected deal.

2. Additional instructions to run the app: (May change because we haven't put it on Glitch yet so we will DEIFINELTY NEED TO CHANGE THIS AT SOME POINT INT THEFUTURE) To run the backend server, navigate to the "/backend" directory within the root project, and run "node index.js" to spin up the server in a localhost and have it listen for requests from the frontend on port 2048. To run the frontend applciation, open a terminal in the root directord and run "npm start" and the webpage should be hosted on http://localhost:3000.

3. Technologies we used: We used the ReactJS framework in the frontend and a NodeJS server to query the persistent NoSQL Mongo database in the backend to store user and deal data. Our backend server connects to a single database and accesses two collections, one to store data about users, and one to store data about deals. We utilized the component-based structure of the React framework to abstract information about deals into components, making it easy to reuse and edit them as the server data changes. This can be observed on the calendar and deal pages.

4. Challenges we faced: 
- One of the main challenges we faced during this project was getting it set up. We had originally planned to implement the NextJS framework into this project. However, our group faced many roadblocks focused around page routing and creating a database connection. Our group spent multiple days trying to resolve these issues and eventually decided to scrap the Next framework and just use pure React.
- Another challenge our group faced was in the designing of the calendar page. We had originally designed it to have some visual display for each day that a deal was active, but due to time constraints, we were unable to implement that.
##Ethan Catania - 
Added Get function and mongoose schema for deal.
Created Deal and Deal Page Components. 
Styled Popup pages
Deal styling
Button for switching between deal and login
inputs for adding deals.
Error handling for
Deal Page add and delete functions.