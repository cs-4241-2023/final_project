# Project: WhatsTheDeal
Contributors: Ethan Catania, Nandita Kumar, Tucker Raymond

## What We Created
Our group created an application which can be used to view current deals for restaurants close to them. On the login page, users can either create a new user and submit it to the database containing users, or input correct credentials and login to the deal page of the application. The deal page contains a list of "deal" components which are rendered based on the contents of the database containing the deal information, as well as a "delete" button to remove the deal from the page and the database. To add a deal to the database, the user must click on the div containing the "Add Deal" text and the plus sign image to make a popup form appear for users to input and submit data.

The calendar page is a place where users can eaisily visualize the deals that are contained within the database. When the calendar page is rendered, it queries the database for any entries contained within the Mongo collection containing deals, and places each deal on the calendar based on the state date of the deal. when an entry in the calendar is clicked on, a popup appears on the screen, displaying the information about the selected deal.

## Additional Instructions to Run the Application:
We realized too late in this project that Glitch does not allow you to host multiple servers from multiple ports at a time. Becuase our application uses a backend server which we have created ourselves, Glitch is unable to run both of the servers. Therefore, to run the backend server and create a connection to the database, the user must download the /backend folder, open the terminal and run "node index.js" to start the server listening on http://localhost:2048. The application hosted on Glitch should make requests to this url and update information correctly as long as the server is running locally. To run the application locally, the user must open a terminal in the root directory, and run "npm start", and the application should be open on http://localhost:3000

## Technologies we Used:
We used the ReactJS framework in the frontend and a NodeJS server to query the persistent NoSQL Mongo database in the backend to store user and deal data. Our backend server connects to a single database and accesses two collections, one to store data about users, and one to store data about deals. We utilized the component-based structure of the React framework to abstract information about deals into components, making it easy to reuse and edit them as the server data changes. This can be observed on the calendar and deal pages.

## Challenges we Faced: 
- One of the main challenges we faced during this project was getting it set up. We had originally planned to implement the NextJS framework into this project. However, our group faced many roadblocks focused around page routing and creating a database connection. Our group spent multiple days trying to resolve these issues and eventually decided to scrap the Next framework and just use pure React.- Another challenge our group faced was in the designing of the calendar page. We had originally designed it to have some visual display for each day that a deal was active, but due to time constraints, we were unable to implement that. 

- Our group faced challenges in parsing data sent from the backend server. It took us multiple hours after getting the server set up properly to get the data from our backend server successfully loaded and rendered on the page.
- Our group also had a challenging time figuring out how to have elements change their value when the corresponding variable in the program changes. We eventually learned that the componentDidMount() function runs a function and updates all elements in the Virtual DOM when the this.setState method is called within it.

## Group Contributions

### Ethan Catania
- Added Get function and mongoose schema for deal.
- Created Deal and Deal Page Components. 
- Styled Popup pages
- Deal styling
- Button for switching between deal and login
- inputs for adding deals.
- Error handling for creating users
- Deal Page add and delete functions.

### Tucker Raymond
- Created initial connection to MongoDB using Mongoose
- Created initial login page and implemented user login verification agains valid users existing on the server
- Implemented page routing functionality using the React BrowserRouter
- Created basic calendar component structure consisting of CalendarPage, Calendar, CalendarDay, and CalendarDeal.
- Added functionality to add and delete deals from the deal collection within the backend server
- Added popup functionality for entries on the calendar, as well as the form to submit a new deal to the database.
- Added button to delete deals from the database in the deal page and make the deals scrollable
- Allow multiple deals to appear on the same day in the calendar page
- Some button styling

### Nandita Kumar
- Misc. styling and formatting of 
    - Login page
    - Calendar page
    - Popups

## Link to Application Video

https://youtu.be/hYbzGkr2S50

## Link to Application Hosted on Glitch (see Additional Instructions to run Application)
https://whatsthedeal.glitch.me/