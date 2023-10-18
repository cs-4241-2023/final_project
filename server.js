import express from "express";
const app = express();
import ViteExpress from "vite-express";
const port = 3000;

const eventsData = [];

// Middleware to parse JSON data in incoming requests
app.use(express.json());

app.get("/getEvents", (req, res) => {
  // Send all events in the eventsData array as a JSON response
  res.json(eventsData);
});

// Handle POST requests to add events
app.post("/addEvent", (req, res) => {
  const eventData = req.body; // Assuming the client sends JSON data
  eventsData.push(eventData);

  // Send a response to the client (optional)
  res.status(201).json({ message: "Event added successfully" });
});

ViteExpress.listen(app, port, () => {
  console.log(`Server is running on port ${port}`);
});
