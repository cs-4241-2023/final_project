# ClimatePro - A Weather Information and Notification Application

## Description

This is a full-stack weather application that provides weather information for a given location and allows users to register, log in, and save their favorite locations. We utilized https://www.weatherapi.com/ for our weather api, which provided us all the useful information needed to create a meaningful weather website for free. The project uses authentication for user registration and login and stores user data persistently. It is hosted on an Amazon EC2 instance.

## Project Link : http://18.117.113.195:3000
## Video Demo : https://www.youtube.com/watch?v=NUoaQJtvBLc&ab_channel=Sombero

## Instructions

To fully use this project, you need to register and log in using your email and password. Please note that GitHub login is currently not functional.

## Technologies Used

- **Frontend:** React, Axios, CSS
  - **React:** The frontend of the application is built using React, to create interactive user interfaces and display weather information to users.
  - **Axios:** Axios is used for making HTTP requests to MongoDB.
  - **CSS:** Custom CSS styles are applied to create an aesthetically pleasing and user-friendly interface.

- **Backend:** Node.js, Express.js, MongoDB
  - **Node.js:** The backend of the application is powered by Node.js, providing a runtime environment for running JavaScript server-side code.
  - **Express.js:** Express.js is used as a web application framework to handle routing, requests, and responses.
  - **MongoDB:** MongoDB is used as the database to store user data, including favorite locations, and authentication information.

- **Authentication:** bcrypt for password hashing
  - **bcrypt:** Bcrypt is utilized for securely hashing and storing user passwords in the database, ensuring the security of user accounts.

- **Database:** MongoDB
  - **MongoDB:** MongoDB is used as the database to store user data, including favorite locations, and authentication information.

- **Hosting:** Amazon EC2 instance
  - The application is hosted on an Amazon Elastic Compute Cloud (EC2) instance to ensure its availability and accessibility to users.

## Challenges Faced

While developing this project, we encountered several challenges:

1. **Weather Alerts:** Implementing weather alerts was a challenge, and even though most of the code is present, it couldn't be made to work properly. It was pretty hard to test the functionality of this too. Therefore, weather alerts are currently commented out.

2. **React:** Implementing everything with React seemed to be much harder than doing it how we did in a2/a3 somehow. We ran into issues uploading our project to Glitch and had to move to an ec2 instance and that worked a lot better. Getting multiple pages to work was tedious. We also had some trouble with sessions, which we don't know why we were having issues with it since we couldn't get it to work and decided to take a different approach.

## What Each Group Member Did

- **Nikola Grozdani:** Implemented login screen, helped with authentication, and HTTP requests
- **Ryan Kornitsky:** Implemented front end, CSS, helped with authentication, HTTP request, and hosted on EC2
- **Justin Wonoski:** Implemented alerts, helped with authentication, and HTTP requests
- **Nathan Shemesh:** Implemented favorites
- **Paul Godinez:** Implemented authentication
