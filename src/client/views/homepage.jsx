import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Stack, Modal } from "react-bootstrap";
import { determineEventType } from "../../Theming/site_control";
function Homepage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    // const tempEvent = {
    //   title: "GBM",
    //   date: new Date("2/2/2023"),
    //   description:
    //     "Yippee! This is a giant blob of text that is going to test how many lines can be handled by the modal",
    // };
    // const tempEventTwo = {
    //   title: "Colloquium",
    //   date: new Date("2/3/2023"),
    //   description: "Robots go brrr!",
    // };
    // const tempEventThree = {
    //   title: "Colloquium",
    //   date: new Date("2/3/2023"),
    //   description: "Robots go brrr!",
    // };
    // const tempEventFour = {
    //   title: "Event asdasd",
    //   date: new Date("2/3/2023"),
    //   description: "Robots go brrr again!",
    // };
    // setEvents([tempEvent, tempEventTwo, tempEventThree, tempEventFour]);

    fetch("/getEvents", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("recieved data: ", data);
        data = data.filter((a) => new Date(a.date) >= Date.now());
        data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(data);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Upcoming Events</h1>
          <Stack
            className="col-md-10"
            style={{
              overflowY: "auto",
              maxHeight: "70%",
            }}
          >
            {events.map((event) => (
              <div key={self.crypto.randomUUID()}>
                <div
                  className="modal show fluid"
                  style={{
                    display: "block",
                    position: "initial",
                    maxWidth: "850px",
                    paddingRight: "20px",
                  }}
                >
                  <Modal.Dialog>
                    <Modal.Header
                      className={`${determineEventType(event.title).style}`}
                    >
                      <Modal.Title>{event.title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      <p>{event.description}</p>
                    </Modal.Body>

                    <Modal.Footer>
                      {"Date: " + new Date(event.date).toDateString()}
                    </Modal.Footer>
                  </Modal.Dialog>
                </div>
              </div>
            ))}
          </Stack>
        </Col>
        <Col>
          <h1>Links and Resources</h1>
          <br />
          <h4>
            <ul>
              <li>
                <a href="https://canvas.wpi.edu/courses/11710" target="_blank">
                  RBE Canvas
                </a>
              </li>
              <li>
                <a href="https://canvas.wpi.edu/courses/11899" target="_blank">
                  RBE Advising Canvas
                </a>
              </li>
              <li>
                <a href="" target="_blank">
                  Official Website
                </a>
              </li>
              <li>
                <a href="" target="_blank">
                  GBM Slides and Minutes
                </a>
              </li>
              <li>
                <a
                  href="https://wiki.wpi.edu/robotics/Main_Page"
                  target="_blank"
                >
                  Robotics Wiki
                </a>
              </li>
              <li>
                <a href="" target="_blank">
                  Instagram
                </a>
              </li>
            </ul>
          </h4>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
