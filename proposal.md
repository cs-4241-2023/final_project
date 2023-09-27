# RendezView by: Samuel Karkache, Brandon Vuong, Randy Huang, Sameer Desai 

## Improved Scheduling for Project Work

**Technologies**: JavaScript, HTML/CSS, Node.js, Express.js, Passport.js, React, and Vite.

Our application, RendezView, is an improved version of the popular [When2Meet](https://www.when2meet.com/) scheduling website. RendezView will allow users to schedule meeting times with a project group of other users. In When2Meet, the meeting times are only accessible through a link that the project creator shares. We want to centralize the functionality of When2Meet such that a user does not need to keep track of multiple links if they are a participant in multiple projects. All of the user’s project meeting times should be accessible through a main dashboard. With RendezView, a user just has to log in with their Microsoft credentials or create a username and password and then create different schedules for the corresponding project groups they are in. For example, if a user is working in a group for their MQP, CS course, and Math course–instead of creating three different When2meet links, they would be able to simply sign into their RendezView account and view their different schedules via a dashboard. The user can also create a new project group from the dashboard.

Our project combines the three main sections of the course material:
1. Static web page content and design - Dashboard and Scheduler Design
2. Dynamic behavior implemented with JavaScript - Interacting with the Scheduler
3. Server-side programming using Node.js - Persistent MongoDB database with users info, opening different project group calendars and Authentication with Microsoft account

**Potential Addition**:
After the group has the RendezView scheduler filled and the group has decided on times to meet. A user can highlight a meeting chunk on the scheduler and create an Outlook event in the app.
