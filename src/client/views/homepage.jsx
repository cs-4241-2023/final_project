import "../css/theming.css";
import "../css/sidebar.css";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Stack, Modal } from "react-bootstrap";

function Homepage() {
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
      <h1>Upcoming Events</h1>
      <Stack gap={2} className="col-md-5">
        {events.map((event) => (
          <div key={self.crypto.randomUUID()}>
            <div
              className="modal show"
              style={{
                display: "block",
                position: "initial",
                minWidth: "600px",
              }}
            >
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>{event.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>{event.description}</p>
                </Modal.Body>

                <Modal.Footer>
                  {"Date: " + event.date.toDateString()}
                </Modal.Footer>
              </Modal.Dialog>
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default Homepage;
