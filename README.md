# Morning Dashboard

Hosted Project at: https://https://shark-app-2-7z934.ondigitalocean.app

Our Morning Dashboard application displays the most important information you'll need after waking up. We took inspiration from Windows XP when choosing the background and including Clippy! Once the app opens, Clippy slides into the main view and gives the user a fun CS fact!

The header includes a greeting, current date, time, and weather (weather and user greeting is customizable in settings). Our app also provides a schedule manager in our home page, which takes an event title and time to display what the user has to look forward to later on. Our application also features customizable sidebar buttons, which can be changed in the settings tab, and a dynamic background that gets darker after 6PM.

## Technologies Used

### Vite

Vite is a build tool and development server that provides an extremely fast development environment. We chose Vite because it offers lightning-fast cold server start and blazing fast rebuilds, which significantly improves the development experience.

### React.js

React.js is a JavaScript library for building user interfaces. We used React for its component-based architecture, which makes the codebase easier to manage and scale.

### WeatherAPI.com

WeatherAPI.com provides reliable and real-time weather data. We used this service to fetch weather information for the application, thanks to its comprehensive API and accurate forecasts.

### CSS

Cascading Style Sheets (CSS) is used for styling the application. We used CSS to create a user-friendly and visually appealing interface, leveraging its capabilities for custom layouts and responsive design.

## Technical Challenges

### Microsoft Paperclip Animation

Animating the iconic Microsoft Paperclip to gracefully move onto the screen was a challenging feat. We utilized CSS animations to achieve the desired behavior, which required a deep understanding of CSS properties and timing functions.

### WeatherAPI Selection

Choosing the right weather API posed a challenge due to budget constraints and subscription requirements. After extensive research, we settled on WeatherAPI.com for its accuracy and reasonable pricing model.

### Dynamic Background Switcher

Implementing a dynamic background that changes from day to night presented some unexpected issues. Specifically, we encountered CSS/HTML quirks that caused scroll bars to appear only during the night theme, requiring meticulous debugging and style adjustments.

### Hosting Challenges

Our initial attempts at hosting presented difficulties, particularly affecting the WeatherAPI calls and the Paperclip animation. Properly configuring the hosting environment was crucial to maintaining the functionality and user experience of our application.

# Division of Software Components

#### Amitai Erfanian

- Microsoft Paperclip
- Day/Night Background Switcher
- App data logic

#### Camilo Escobar

- Header component
- App data logic
- Weather API implementation
- Settings component

#### Aarsh Z

-

#### Nick Borrello

-
