import "../css/theming.css";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function AttendancePage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const tempEvent = [
      {
        title: "GBM",
        date: new Date("2/2/2023"),
        description: "Yippee!",
      },
    ];
    setEvents(tempEvent);
    return;
    fetch("/get", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        setEvents(data);
      });
  }, []);
  return (
    <div>
      <h1>Attendance Tracking</h1>
      <br />
      <h2>Submit Attendance</h2>
      <Form
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "500px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control type="text" id="password" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="dateSubmission">Date Completed</Form.Label>

          <Form.Select>
            <option>GBM Date</option>
            {events.map((event) => (
              <option key={self.crypto.randomUUID()}>
                {event.title + ": " + event.date.toDateString()}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" className="btn-primary">
          Submit
        </Button>
      </Form>
      <br />
      <h2>Excused Absence</h2>
      <Form
        style={{
          border: "1px solid",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "500px",
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label htmlFor="dateSubmission">Date Completed</Form.Label>
          <Form.Select>
            <option>GBM Date</option>
            {events.map((event) => (
              <option key={self.crypto.randomUUID()}>
                {event.title + ": " + event.date.toDateString()}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Reason</Form.Label>
          <Form.Control required as="textarea" id="exscuse" rows={5} />
        </Form.Group>
        <Button type="submit" className="btn-primary">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AttendancePage;
