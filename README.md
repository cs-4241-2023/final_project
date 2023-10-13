# RendezView

## Project Link: 
https://rendezview.glitch.me/

## Project Description
RendezView is an improved version of the popular scheduling app When2Meet.
Our application implements an account-based project scheduling system. A user
creates and account and once they are logged in, they will be presented a dashboard
of all project groups that they are a member of. Inside each project group, the 
user, and all other participants can specify the times in which they are available.
The application then finds overlapping availabilities and suggests possible meeting times
when all members are available. 

## Instructions
Upon opening RendezView, you will be greeted with a page where you can either
log into the application or create an account. Creating an account is straightforward,
click sign up button and specify a username and password. Now you can log in with the 
newly created credentials. An existing account with the following credentials can also be
logged into.
<br />
`username: admin`<br />
`password: admin`<br />
You can create a new group by pressing the _Create New Group_ button. Here you
can specify the group name, description, and users. Note that you cannot add users
who do not exist to a group. For demonstration purposes you can add yourself, a user
named `brandon` and a user named `randy`. Now that the group has been created you can 
either delete it or go to the group page to specify your availability.


## Technologies Used
- **JavaScript:** We used JavaScript for the front-end and back-end. The usage of JavaScript
was very straightforward as it was our main development language. 
- **React w/Vite:** We used React.js with Vite for create the front-end for our application. React
is the best JavaScript framework for front-end implementations and is much easier to use to 
develop our application compared to standard HTML/CSS.
- **Node.js w/Express:** Our back-end used Node.js to handle HTTP routing and functionality. Express.js
was used with Node.js in order to implement useful middleware for our application. 
- **MongoDB w/Mongoose:** We used MongoDB with Mongoose for persistent data storage for our 
application. We felt as though it was the easiest database technology to utilize for an application
of this scale. We used Mongoose to specify a `User` and `Group` model for the database.

## Development Challenges
- **Implementing the accounts:** The account system was a challenge to implement since it required some users
to share data. This required us to add a field to the `User` collection that was essentially a list of 
references to the groups that they were in. When a group is created, all specified users will gain a reference
to the newly created group. When the dashboard is rendered, only groups with the ids specified in the current user's
document are actually rendered to the screen. This implementation required lot of trial and error to get working. 
- **Implementing the time grid:** TODO

## Group Member Contributions
### Samuel Karkache:
### Brandon Vuong: 
### Randy Huang: 
### Sameer Desai

## Project Video
_link_