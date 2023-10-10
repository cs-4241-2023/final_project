import "../css/theming.css";
import "../css/sidebar.css";
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Stack, Modal } from "react-bootstrap";

function Homepage() {
  //   const [events, setEvents] = useState([]);
  const events = [1, 12, 123, 1234];
  return (
    <div>
      <h1>Upcoming Events</h1>
      <Stack gap={2} className="col-md-5">
        {events.map((event) => (
          <div key={self.crypto.randomUUID()}>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>event name</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>{event}</p>
                </Modal.Body>

                <Modal.Footer>Reeeeee</Modal.Footer>
              </Modal.Dialog>
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
}

export default Homepage;
