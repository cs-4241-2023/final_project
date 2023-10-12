# Project Title: ClimatePro - A Weather Information and Notification Application

## Team Members
Ryan Kornitsky, Justin Santiago Wonoski, Nathan Shemesh, Nikola Grozdani, Paul Godinez


## Project Description

WeatherHub is a web application that provides users with real-time weather information and notifications for their favorited locations. The primary goal is to offer a user-friendly interface to access essential weather data and receive alerts about weather conditions in their favorite locations.

## Key Features

1. **User Registration and Authentication**:
   - Allow users to register and log in to their accounts.
   - Authenticate users using GitHub Auth.

2. **Location Selection**:
   - Enable users to search for and select locations by name/city.
   - Store favorited locations saved by users.

3. **Favorite Locations**:
   - Allow users to mark specific locations as favorites.
   - Provide an interface to manage and view their favorite locations.

4. **Weather Information**:
   - Integrate OpenWeatherMap API to fetch current weather data for selected locations.
   - Display essential weather information, including temperature, weather description, humidity, wind speed, etc.

5. **Weather Alerts**:
   - Implement a notification system to alert users about severe weather conditions in their favorited locations.

6. **User Dashboard**:
   - Create a user dashboard where users can see weather information for their favorited locations.
   - Include weather forecasts, current conditions, and recent alerts.

7. **Settings and Preferences**:
   - Allow users to customize units (e.g., Celsius or Fahrenheit) and notification preferences.
   - Provide an option to enable or disable specific types of weather alerts.

## Key Technologies/Libraries

### Frontend

- React for building the user interface.
- `fetch` for making API requests to OpenWeatherMap.
- React Router for managing routes.

### Backend

- Node.js and Express.js for building the server.
- MongoDB Atlas for data storage, including user accounts and favorited locations.
- Authentication libraries like Passport.js for user registration and login.

### Weather Data

- Integration with the OpenWeatherMap API for real-time weather data and alerts.

### Notifications

- Implementing a notification system, which will involve pinging/updating the users notification box on the website.
