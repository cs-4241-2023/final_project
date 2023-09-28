# Project Proposal: Productivity Dashboard

## Team Members:
- Amitai Erfanian
- Nick Borrello
- Aarsh Zadaphiya
- Camilo Escobar

## Project Purpose:
The primary objective is to centralize productivity tools in a single, intuitive dashboard. This aims to streamline users' daily workflows while also incorporating elements that promote work-life balance through subtle design cues.

## Description:
This dashboard integrates essential features like calendar, weather, and quick app links into a single view. Users will be able to manage their day more effectively by having all necessary information and tools at their fingertips.

### XP Twist:
The dashboard incorporates a unique twist by adopting the nostalgic Windows XP interface. Not just a stylistic choice, the design also has a functional aspect; the background dynamically adjusts to reflect day and night cycles, and the display includes a sun or moon based on the time of day.

## Key Features:
- Calendar: Utilizes ICAL.js API to display the next three events on a Sticky Note.
- Weather: Real-time weather data pulled from WeatherAPI.
- Embedded Apps: Sidebar with quick access to vital apps.
- Dynamic Background: Adjusts based on real-world time.
- Pun-of-the-Day: A light-hearted addition featuring daily puns from the Microsoft Word Paperclip.
- User Settings: Customization options for calendar, name, and location.

## Technologies/Libraries:
- **Frontend: ReactJS, JavaScript**
  - *Why*: Component-based, maintainable, vast community support.
- **Backend: Node.js**
  - *Why*: Unified language with frontend, high performance, scalable.
- **APIs: WeatherAPI, ICAL.js for ReactJS**
  - *Why*: Accurate weather data, reliable calendar data parsing.
- **Styling: CSS, TailwindCSS**
  - *Why*: Foundation with CSS, rapid development, and consistency with Tailwind.
- **Database: MongoDB**
  - *Why*: Document-oriented, flexible, and easily scalable.

## User Experience:
The user interface is designed with intuitiveness at its core, aimed at reducing the time users spend learning how to navigate and utilize the dashboard. It combines retro design elements reminiscent of the Windows XP interface with modern usability principles. This fusion serves a dual purpose; it engages users by invoking a sense of nostalgia and keeps their attention by making essential productivity tools easily accessible. For example, frequently-used apps can be accessed from a sidebar, while the Sticky Note and weather information are positioned prominently but unobtrusively. The inclusion of the Microsoft Word Paperclip with daily puns adds a whimsical touch, making the user experience more enjoyable. In summary, the UI aims not just for utility but also to foster a sense of delight, thereby increasing the likelihood of user retention.
